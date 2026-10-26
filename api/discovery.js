import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || SMTP_USER,
      to: SMTP_TO,
      replyTo: submission.email,
      subject: `New Discovery Lead: ${submission.name}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Company: ${submission.company}`,
        `Website: ${submission.website || 'Not provided'}`,
        `Scope: ${submission.scope}`,
        `Details: ${submission.details}`,
        `Budget: ${submission.budget}`,
        `Timeline: ${submission.timeline}`,
      ].join('\n'),
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