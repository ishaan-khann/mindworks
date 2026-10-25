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
