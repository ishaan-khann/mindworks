import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Vite dev server discovery API middleware plugin
function discoveryApiPlugin() {
  return {
    name: 'discovery-api-plugin',
    configureServer(server) {
      const dataDir = path.resolve(import.meta.dirname || process.cwd(), 'data');
      const dataFile = path.resolve(dataDir, 'discovery_submissions.json');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify([], null, 2), 'utf8');
      }

      server.middlewares.use('/api/discovery', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const { name, email, company, website, scope, details, budget, timeline } = data;

              if (!name || !email || !company || !scope || !details) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'Required fields missing' }));
                return;
              }

              const submission = {
                id: 'mw_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
                name: name.trim(),
                email: email.trim(),
                company: company.trim(),
                website: (website || '').trim(),
                scope,
                details: details.trim(),
                budget: budget || 'Not specified',
                timeline: timeline || 'Not specified',
                status: 'new',
                createdAt: new Date().toISOString(),
              };

              let list = [];
              try {
                list = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
              } catch {
                list = [];
              }

              list.unshift(submission);
              fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), 'utf8');

              console.log(`[MindWorks] New lead: ${submission.name} (${submission.email}) — ${submission.company}`);

              // Send email notification via nodemailer
              import('nodemailer').then((nodemailerModule) => {
                const nodemailer = nodemailerModule.default;
                const transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                    user: 'khanishaan846@gmail.com',
                    pass: 'iqxhgwnxpbzojnba',
                  },
                });

                const mailOptions = {
                  from: '"MindWorks Leads" <khanishaan846@gmail.com>',
                  to: 'khanishaan846@gmail.com',
                  subject: `🚀 New Discovery Lead: ${submission.name} — ${submission.company}`,
                  html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f4f4f6; padding: 32px; border-radius: 12px; border: 1px solid #222;">
                      <h2 style="margin: 0 0 8px; font-size: 22px; letter-spacing: -0.02em; color: #fff;">📩 New Discovery Call Request</h2>
                      <p style="margin: 0 0 24px; color: #888; font-size: 13px;">Submitted via mindworks.ai</p>
                      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888; width: 130px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #f4f4f6;">${submission.name}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;"><a href="mailto:${submission.email}" style="color: #a78bfa; text-decoration: none;">${submission.email}</a></td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #f4f4f6;">${submission.company}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888;">Website</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #f4f4f6;">${submission.website || '—'}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888;">Scope</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #f4f4f6;">${submission.scope}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888;">Budget</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #f4f4f6;">${submission.budget}</td></tr>
                        <tr><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #888;">Timeline</td><td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a; color: #f4f4f6;">${submission.timeline}</td></tr>
                        <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Details</td><td style="padding: 10px 0; color: #f4f4f6; line-height: 1.6;">${submission.details}</td></tr>
                      </table>
                      <p style="margin-top: 32px; font-size: 11px; color: #444;">Submission ID: ${submission.id} · ${submission.createdAt}</p>
                    </div>
                  `,
                };

                transporter.sendMail(mailOptions)
                  .then(info => console.log('[MindWorks] ✅ Email sent:', info.response))
                  .catch(err => console.error('[MindWorks] ❌ Email error:', err.message));
              }).catch(err => console.error('[MindWorks] nodemailer import error:', err.message));

              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: "Request received. We'll be in touch shortly.",
                  id: submission.id,
                })
              );
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else if (req.method === 'GET') {
          try {
            const list = JSON.parse(fs.readFileSync(dataFile, 'utf8') || '[]');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: list.length, submissions: list }));
          } catch {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: 0, submissions: [] }));
          }
        } else {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), discoveryApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
