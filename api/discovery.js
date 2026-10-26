import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, company, website, scope, details, budget, timeline } = request.body || {};
  const requiredValues = [name, email, company, scope, details];

  if (requiredValues.some((value) => typeof value !== 'string' || !value.trim())) {
    return response.status(400).json({ success: false, error: 'Please complete all required fields.' });
  }

  if (!emailPattern.test(email.trim())) {
    return response.status(400).json({ success: false, error: 'Enter a valid work email.' });
  }

  const { SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !SMTP_TO) {
    return response.status(503).json({
      success: false,
      error: 'Email delivery is not configured yet. Please email us directly instead.',
    });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const submission = {
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    website: typeof website === 'string' ? website.trim() : '',
    scope: scope.trim(),
    details: details.trim(),
    budget: typeof budget === 'string' && budget ? budget : 'Not specified',
    timeline: typeof timeline === 'string' && timeline ? timeline : 'Not specified',
  };
  const emailRows = [
    ['Name', submission.name],
    ['Email', submission.email],
    ['Company', submission.company],
    ['Website', submission.website || 'Not provided'],
    ['Project scope', submission.scope],
    ['Project details', submission.details],
    ['Budget', submission.budget],
    ['Timeline', submission.timeline],
  ];
  const htmlRows = emailRows.map(([label, value]) => `
    <tr>
      <th scope="row" style="width: 150px; padding: 12px 14px; text-align: left; vertical-align: top; color: #667085; font-size: 13px; font-weight: 600; border-bottom: 1px solid #eaecf0;">${escapeHtml(label)}</th>
      <td style="padding: 12px 14px; color: #101828; font-size: 14px; line-height: 1.55; border-bottom: 1px solid #eaecf0; white-space: pre-wrap;">${escapeHtml(value)}</td>
    </tr>`).join('');

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || SMTP_USER,
      to: SMTP_TO,
      replyTo: submission.email,
      subject: `📩 New MindWorks Inquiry: ${submission.name} | ${submission.company}`,
      text: emailRows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `
        <div style="margin: 0; padding: 32px 16px; background: #f5f6f8; font-family: Arial, Helvetica, sans-serif; color: #101828;">
          <div style="max-width: 680px; margin: 0 auto; overflow: hidden; background: #ffffff; border: 1px solid #e4e7ec; border-radius: 8px;">
            <div style="padding: 24px 28px; background: #111111; color: #ffffff;">
              <p style="margin: 0 0 7px; color: #c5c8ce; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">MindWorks · Discovery</p>
              <h1 style="margin: 0; font-size: 22px; line-height: 1.3; font-weight: 600;">New project inquiry</h1>
            </div>
            <div style="padding: 22px 28px 28px;">
              <p style="margin: 0 0 18px; color: #475467; font-size: 14px; line-height: 1.6;">A new discovery request came in. Reply directly to this email to contact ${escapeHtml(submission.name)}.</p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #eaecf0; border-radius: 6px;">
                <tbody>${htmlRows}
                </tbody>
              </table>
              <p style="margin: 20px 0 0; color: #98a2b3; font-size: 11px;">Sent from the MindWorks discovery form.</p>
            </div>
          </div>
        </div>`,
    });
  } catch (error) {
    console.error('Discovery email delivery failed:', error.message);
    return response.status(502).json({
      success: false,
      error: 'We could not send your request right now. Please try again or email us directly.',
    });
  }

  return response.status(201).json({
    success: true,
    message: "Request received. We'll be in touch shortly.",
  });
}