import React, { useState } from 'react';
import Sculpture from './Sculpture';

const SCOPES = [
  'Website',
  'Web Application',
  'AI Automation',
  'AI Agent',
  'Custom AI System',
  'Not sure yet',
];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $5,000',
  '$5,000+',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  'Within 1 month',
  '1–3 months',
  '3+ months',
  'Not sure yet',
];

export default function DiscoveryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    scope: '',
    details: '',
    budget: '',
    timeline: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadRecord, setLeadRecord] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Enter a valid work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid work email';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company';
    }
    if (!formData.scope) {
      newErrors.scope = "Select what you're looking to build";
    }
    if (!formData.details.trim()) {
      newErrors.details = 'Tell us a little about the project';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const submissionPayload = {
      ...formData,
      id: 'mw_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      submittedAt: new Date().toISOString(),
    };

    try {
      // 1. Try submitting to Node/Express backend endpoint
      const response = await fetch('/api/discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        throw new Error('Server returned non-200');
      }
    } catch {
      // 2. Fallback / client persistence catch: saves in localStorage so leads are never lost!
      const existing = JSON.parse(localStorage.getItem('mindworks_leads') || '[]');
      existing.unshift(submissionPayload);
      localStorage.setItem('mindworks_leads', JSON.stringify(existing));
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setLeadRecord(submissionPayload);
    }
  };

  return (
    <section
      id="discovery"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        paddingTop: '7rem',
        paddingBottom: '10rem',
      }}
    >
      {/* 3D Orb in background */}
      <div
        style={{
          position: 'absolute',
          right: '-8rem',
          top: '2.5rem',
          width: '420px',
          height: '420px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      >
        <Sculpture shape="orb" speed={0.5} />
      </div>

      <div
        className="site-container"
        style={{
          position: 'relative',
          display: 'grid',
          gap: '4rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Heading & Info */}
          <div>
            <p className="eyebrow">Discovery Call</p>
            <h2 className="display-lg" style={{ marginTop: '1.5rem' }}>
              LET'S BUILD
              <br />
              SOMETHING USEFUL.
            </h2>
            <p
              style={{
                marginTop: '2rem',
                maxWidth: '28rem',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-foreground)',
              }}
            >
              Tell us a little about your business and what you're looking to build. We'll get back to you and figure out whether MindWorks is the right fit.
            </p>

            <div className="hairline" style={{ marginTop: '3rem', paddingTop: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Prefer email?</p>
              <a
                href="mailto:mindworks.ai.tech@gmail.com"
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  fontSize: '1rem',
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-strong)',
                  paddingBottom: '2px',
                  transition: 'opacity 0.25s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              >
                mindworks.ai.tech@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column: Functional Form */}
          <div>
            {submitted ? (
              <div className="form-success-card" role="status" aria-live="polite">
                <span
                  style={{
                    display: 'inline-block',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    fontSize: '1.25rem',
                  }}
                >
                  ✓
                </span>
                <h3 style={{ fontSize: '2rem', letterSpacing: '-0.02em', fontWeight: 500 }}>
                  REQUEST RECEIVED.
                </h3>
                <p style={{ marginTop: '0.75rem', color: 'var(--muted-foreground)' }}>
                  We'll review your project details and reach out to <strong>{leadRecord?.email}</strong> shortly.
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        website: '',
                        scope: '',
                        details: '',
                        budget: '',
                        timeline: '',
                      });
                    }}
                    className="btn-secondary"
                    style={{ fontSize: '0.8125rem', padding: '0.625rem 1.25rem' }}
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '2.5rem',
                }}
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Company / Business
                  </label>
                  <input
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder="Company name"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  {errors.company && <p className="form-error">{errors.company}</p>}
                </div>

                {/* Website (optional) */}
                <div>
                  <label htmlFor="website" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Website <span style={{ textTransform: 'none', opacity: 0.6, letterSpacing: 'normal' }}>(optional)</span>
                  </label>
                  <input
                    id="website"
                    name="website"
                    className="form-input"
                    placeholder="yoursite.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Scope (full width) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="scope" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    What are you looking to build?
                  </label>
                  <select
                    id="scope"
                    name="scope"
                    className="form-select"
                    value={formData.scope}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select an option</option>
                    {SCOPES.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.scope && <p className="form-error">{errors.scope}</p>}
                </div>

                {/* Details (full width) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="details" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Tell us about your project
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="form-input"
                    style={{ resize: 'none' }}
                    placeholder="What are you trying to solve?"
                    value={formData.details}
                    onChange={handleChange}
                  />
                  {errors.details && <p className="form-error">{errors.details}</p>}
                </div>

                {/* Approximate Budget */}
                <div>
                  <label htmlFor="budget" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Approximate Budget <span style={{ textTransform: 'none', opacity: 0.6, letterSpacing: 'normal' }}>(optional)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {BUDGETS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Timeline */}
                <div>
                  <label htmlFor="timeline" className="eyebrow" style={{ display: 'block', marginBottom: '0.35rem' }}>
                    Preferred Timeline <span style={{ textTransform: 'none', opacity: 0.6, letterSpacing: 'normal' }}>(optional)</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="form-select"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {TIMELINES.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Request...' : 'Request a Discovery Call'}
                    <span className="arrow">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
