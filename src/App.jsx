import React from 'react';
import Navbar from './components/Navbar';
import Sculpture from './components/Sculpture';
import DiscoveryForm from './components/DiscoveryForm';

const SERVICES = [
  {
    n: '01',
    t: 'AI AUTOMATION',
    d: 'Automate repetitive processes, connect your tools and build intelligent workflows that save your team time.',
  },
  {
    n: '02',
    t: 'AI AGENTS',
    d: 'Build AI-powered agents that can communicate with customers, answer questions, qualify leads and execute business workflows.',
  },
  {
    n: '03',
    t: 'WEB EXPERIENCES',
    d: 'High-performance websites designed to communicate your value, build trust and convert visitors into customers.',
  },
  {
    n: '04',
    t: 'WEB APPLICATIONS',
    d: 'Custom platforms, dashboards, internal tools and SaaS applications designed specifically around your business.',
  },
];

const PILLARS = [
  {
    t: 'THINK SYSTEMS',
    d: "We don't build isolated features. We think about how everything connects.",
  },
  {
    t: 'BUILD WITH PURPOSE',
    d: 'Every interaction, workflow and feature should have a reason.',
  },
  {
    t: 'AI-NATIVE',
    d: 'We use modern AI capabilities to create smarter and more scalable businesses.',
  },
  {
    t: 'BUILT TO EVOLVE',
    d: 'Everything we build should be maintainable and ready to grow with the business.',
  },
];

const PROCESS_STEPS = [
  {
    n: '01',
    t: 'UNDERSTAND',
    d: 'We learn about your business, goals, customers and operational problems.',
  },
  {
    n: '02',
    t: 'DESIGN',
    d: 'We create the strategy, experience and technical architecture.',
  },
  {
    n: '03',
    t: 'BUILD',
    d: 'We design and engineer the website, application, automation or AI system.',
  },
  {
    n: '04',
    t: 'LAUNCH & EVOLVE',
    d: 'We launch, optimize and continue improving the system as your business grows.',
  },
];

const TECHNOLOGIES = [
  'React',
  'Next.js',
  'Node.js',
  'Supabase',
  'Firebase',
  'OpenAI',
  'Anthropic',
  'Stripe',
  'Tailwind',
  'Three.js',
];

export default function App() {
  return (
    <div id="top" style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000000' }}>
      {/* Fixed Navbar */}
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: 'relative',
            display: 'flex',
            minHeight: '78svh',
            alignItems: 'center',
            overflow: 'hidden',
            paddingTop: '5.5rem',
            paddingBottom: '3rem',
          }}
        >
          {/* 3D Floating Knot Sculpture in Hero */}
          <div
            style={{
              position: 'absolute',
              right: '-8%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(18rem, 42vw, 36rem)',
              height: 'clamp(18rem, 42vw, 36rem)',
              opacity: 0.95,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <Sculpture shape="knot" speed={1.1} />
          </div>

          <div className="site-container" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
            <p className="eyebrow">
              AI Automation · Web Development · Digital Systems
            </p>

            <h1 className="display-xl" style={{ marginTop: '1.25rem', maxWidth: '56rem' }}>
              WE BUILD
              <br />
              DIGITAL SYSTEMS
              <br />
              THAT MOVE
              <br />
              BUSINESSES FORWARD.
            </h1>

            <div
              style={{
                marginTop: '2.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '2rem',
              }}
            >
              <p
                style={{
                  maxWidth: '28rem',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--muted-foreground)',
                }}
              >
                AI automation, intelligent web experiences and custom digital systems designed to help businesses operate better and grow faster.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.875rem' }}>
                <a href="#discovery" className="btn-primary">
                  Book a Discovery Call
                  <span className="arrow">→</span>
                </a>
                <a href="#process" className="btn-secondary">
                  See How We Work
                  <span className="arrow">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / STATEMENT SECTION */}
        <section
          id="about"
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '4.5rem',
            paddingBottom: '5rem',
          }}
        >
          <div className="site-container">
            <h2 className="display-lg" style={{ maxWidth: '56rem' }}>
              THE INTERNET IS FULL OF WEBSITES.
              <br />
              VERY FEW OF THEM ACTUALLY WORK.
            </h2>
            <p
              style={{
                marginTop: '2.25rem',
                maxWidth: '36rem',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--muted-foreground)',
                marginLeft: 'auto',
              }}
            >
              MindWorks combines design, development and AI to build digital systems that are designed around how your business actually operates.
            </p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '4rem',
            paddingBottom: '4.5rem',
          }}
        >
          <div className="site-container">
            <p className="eyebrow">What we build</p>

            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)' }}>
              {SERVICES.map((s) => (
                <a key={s.n} href="#discovery" className="service-row">
                  <span className="service-num">{s.n}</span>
                  <h3 className="service-title">{s.t}</h3>
                  <p className="service-desc">{s.d}</p>
                  <span className="service-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* SURFACE VS UNDERNEATH (RING 3D SHAPE) */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid var(--border)',
            paddingTop: '4.5rem',
            paddingBottom: '5rem',
          }}
        >
          <div
            className="site-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            <div>
              <h2 className="display-lg">
                DESIGN IS ONLY THE
                <br />
                SURFACE.
              </h2>
              <h2 className="display-lg" style={{ marginTop: '1rem', color: 'var(--muted-foreground)' }}>
                WE BUILD WHAT'S
                <br />
                UNDERNEATH IT.
              </h2>
              <p
                style={{
                  marginTop: '1.75rem',
                  maxWidth: '28rem',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--muted-foreground)',
                }}
              >
                From the interface your customers see to the AI systems and automations running behind it, MindWorks builds the complete digital layer your business needs.
              </p>
            </div>

            <div style={{ height: 'clamp(14rem, 24vw, 22rem)', position: 'relative' }}>
              <Sculpture shape="ring" speed={0.7} />
            </div>
          </div>
        </section>

        {/* WHY MINDWORKS / PILLARS */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '3.75rem',
            paddingBottom: '4.5rem',
          }}
        >
          <div className="site-container">
            <p className="eyebrow">Why MindWorks</p>

            <div className="pillars-grid">
              {PILLARS.map((p) => (
                <div key={p.t}>
                  <h3 className="pillar-title">{p.t}</h3>
                  <p className="pillar-desc">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section
          id="process"
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '3.75rem',
            paddingBottom: '4.5rem',
          }}
        >
          <div className="site-container">
            <h2 className="display-lg">FROM IDEA TO SYSTEM.</h2>

            <ol className="process-grid">
              {PROCESS_STEPS.map((step) => (
                <li key={step.n} className="process-step">
                  <span className="process-step-num">{step.n}</span>
                  <h3 className="process-step-title">{step.t}</h3>
                  <p className="process-step-desc">{step.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* IMPACT STATEMENT (CAPSULE 3D) */}
        <section
          style={{
            position: 'relative',
            display: 'flex',
            minHeight: '56vh',
            alignItems: 'center',
            overflow: 'hidden',
            borderTop: '1px solid var(--border)',
            paddingTop: '4.5rem',
            paddingBottom: '4.5rem',
          }}
        >
          {/* Subtle localized glow behind 3D Capsule */}
          <div
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(130, 130, 180, 0.02) 40%, transparent 70%)',
            }}
          />

          {/* 3D Capsule in center background */}
          <div
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(16rem, 36vw, 30rem)',
              height: 'clamp(16rem, 36vw, 30rem)',
              opacity: 0.65,
            }}
          >
            <Sculpture shape="capsule" speed={0.45} />
          </div>

          <div className="site-container" style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
            <h2 className="display-xl">
              YOUR WEBSITE
              <br />
              SHOULD DO MORE
              <br />
              THAN EXIST.
            </h2>
            <p className="display-lg" style={{ marginTop: '1.5rem', color: 'var(--muted-foreground)' }}>
              IT SHOULD WORK.
            </p>
          </div>
        </section>

        {/* MODERN TECHNOLOGY STACK */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '3.5rem',
            paddingBottom: '4rem',
          }}
        >
          <div className="site-container">
            <h2 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', letterSpacing: '-0.02em', fontWeight: 500 }}>
              BUILT WITH MODERN TECHNOLOGY.
            </h2>

            <ul
              style={{
                marginTop: '1.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: '2rem',
                rowGap: '1rem',
                listStyle: 'none',
              }}
            >
              {TECHNOLOGIES.map((tech) => (
                <li key={tech} className="tech-tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DISCOVERY FORM SECTION */}
        <DiscoveryForm />

        {/* READY TO BUILD CTA SECTION */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '4.5rem',
            paddingBottom: '5.5rem',
          }}
        >
          <div className="site-container">
            <h2 className="display-lg">
              READY TO BUILD
              <br />
              WHAT'S NEXT?
            </h2>

            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
              }}
            >
              <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)' }}>
                Let's talk about what your business needs.
              </p>
              <a href="#discovery" className="btn-primary">
                Book a Discovery Call
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
            }}
          >
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.02em' }}>MindWorks</p>
              <p style={{ marginTop: '0.75rem', maxWidth: '16rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                AI Systems. Digital Experiences. Built Differently.
              </p>
            </div>

            <nav aria-label="Footer">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
                {[
                  { l: 'Services', h: '#services' },
                  { l: 'Process', h: '#process' },
                  { l: 'About', h: '#about' },
                  { l: 'Contact', h: '#discovery' },
                ].map((item) => (
                  <li key={item.l}>
                    <a
                      href={item.h}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--muted-foreground)',
                        textDecoration: 'none',
                        transition: 'color 0.25s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                    >
                      {item.l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
              <a
                href="mailto:mindworks.ai.tech@gmail.com"
                style={{
                  color: 'var(--muted-foreground)',
                  textDecoration: 'none',
                  transition: 'color 0.25s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
              >
                mindworks.ai.tech@gmail.com
              </a>

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.25rem' }}>
                {['LinkedIn', 'Instagram', 'X'].map((social) => (
                  <a
                    key={social}
                    href="#top"
                    style={{
                      color: 'var(--muted-foreground)',
                      textDecoration: 'none',
                      transition: 'color 0.25s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="hairline"
            style={{
              marginTop: '3.5rem',
              paddingTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--muted-foreground)',
            }}
          >
            <span>© 2026 MindWorks</span>
            <span>Built with intention.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
