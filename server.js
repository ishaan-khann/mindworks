import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'discovery_submissions.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2), 'utf8');
}

// Helper: read submissions
function getSubmissions() {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper: save submissions
function saveSubmissions(list) {
  fs.writeFileSync(dataFile, JSON.stringify(list, null, 2), 'utf8');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MindWorks Discovery API',
    time: new Date().toISOString(),
  });
});

// Discovery Catch Form Endpoint
app.post('/api/discovery', (req, res) => {
  const { name, email, company, website, scope, details, budget, timeline } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required' });
  }

  if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Valid work email is required' });
  }

  if (!company || !company.trim()) {
    return res.status(400).json({ success: false, error: 'Company is required' });
  }

  if (!scope) {
    return res.status(400).json({ success: false, error: 'Scope of project is required' });
  }

  if (!details || !details.trim()) {
    return res.status(400).json({ success: false, error: 'Project details are required' });
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

  const all = getSubmissions();
  all.unshift(submission);
  saveSubmissions(all);

  console.log(`[MindWorks Discovery] New lead captured from ${submission.name} (${submission.email}) at ${submission.company}`);

  return res.status(201).json({
    success: true,
    message: "Request received. We'll be in touch shortly.",
    id: submission.id,
  });
});

// List all captured submissions (convenient for testing and review)
app.get('/api/discovery', (req, res) => {
  const list = getSubmissions();
  res.json({
    success: true,
    count: list.length,
    submissions: list,
  });
});

// In production, serve the built frontend
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`MindWorks Node.js server running on http://localhost:${PORT}`);
});
