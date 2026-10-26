import React from 'react';
import Navbar from './components/Navbar';
import Sculpture from './components/Sculpture';
import DiscoveryForm from './components/DiscoveryForm';
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { RiOpenaiFill } from 'react-icons/ri';

const SERVICES = [
  {
    n: '01',
    t: 'AI WORKFLOW AUTOMATION',
    d: 'As an AI automation agency, we connect your tools and design AI workflows that reduce repetitive work and fit your real operations.',
  },
  {
    n: '02',
    t: 'AI AGENTS & CHATBOTS',
    d: 'Build AI agents and AI chatbots that answer customer questions, qualify leads, support teams and take action across business workflows.',
  },
  {
    n: '03',
    t: 'WEB DESIGN',
    d: 'Our web design agency creates fast, responsive business websites that communicate your value, build trust and turn visitors into enquiries.',
  },
  {
    n: '04',
    t: 'WEB APPLICATIONS',
    d: 'Custom web development for platforms, dashboards, internal tools and SaaS products shaped around how your business works.',
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
  { name: 'React',      slug: 'react',      color: '#61DAFB' },
  { name: 'Next.js',   slug: 'nextdotjs',  color: '#ffffff' },
  { name: 'Node.js',   slug: 'nodedotjs',  color: '#5FA04E' },
  { name: 'Supabase',  slug: 'supabase',   color: '#3FCF8E' },
  { name: 'Firebase',  slug: 'firebase',   color: '#DD2C00' },
  { name: 'OpenAI',    slug: 'openai',     color: '#ffffff' },
  { name: 'Anthropic', slug: 'anthropic',  color: '#ffffff' },
  { name: 'Stripe',    slug: 'stripe',     color: '#635BFF' },
  { name: 'Tailwind',  slug: 'tailwindcss',color: '#06B6D4' },
  { name: 'Three.js',  slug: 'threedotjs', color: '#ffffff' },
  { name: 'TypeScript',slug: 'typescript', color: '#3178C6' },
  { name: 'Python',    slug: 'python',     color: '#3776AB' },
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
            minHeight: 'calc(100svh - 1rem)',
            alignItems: 'center',
            overflow: 'hidden',
            paddingTop: '4.75rem',
            paddingBottom: '1.5rem',
          }}
        >
          {/* White glow behind hero knot */}
          <div
            style={{
              position: 'absolute',
              right: '-2%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(22rem, 44vw, 40rem)',
              height: 'clamp(22rem, 44vw, 40rem)',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(18px)',
            }}
          />

          {/* 3D Floating Knot Sculpture in Hero */}
          <div
            style={{
              position: 'absolute',
              right: '-6%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(18rem, 36vw, 32rem)',
              height: 'clamp(18rem, 36vw, 32rem)',
              opacity: 0.95,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <Sculpture shape="knot" speed={1.1} />
          </div>


          <div className="site-container" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
            <h1 className="display-xl" style={{ marginTop: '0', maxWidth: '54rem' }}>
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
                marginTop: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1.5rem',
              }}
            >
              <p
                style={{
                  maxWidth: '28rem',
                  fontSize: '0.975rem',
                  lineHeight: 1.55,
                  color: 'var(--muted-foreground)',
                }}
              >
                MindWorks is an AI agency building AI workflow automation, AI agents and chatbots, web design, and custom web applications for businesses.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
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

        <section
          aria-labelledby="service-faq-heading"
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '3.75rem',
            paddingBottom: '4.5rem',
          }}
        >
          <div className="site-container">
            <p className="eyebrow">AI and web services</p>
            <h2 id="service-faq-heading" className="display-lg" style={{ marginTop: '1rem' }}>
              PRACTICAL ANSWERS. USEFUL SYSTEMS.
            </h2>
            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem', maxWidth: '52rem' }}>
              <div>
                <h3 className="pillar-title">What does an AI agency build?</h3>
                <p className="pillar-desc">An AI agency can design AI workflows, connect business software, and build agents or chatbots for tasks such as customer support, lead qualification and internal knowledge search. MindWorks scopes each system around the process it needs to improve.</p>
              </div>
              <div>
                <h3 className="pillar-title">Can AI agents and chatbots connect to business workflows?</h3>
                <p className="pillar-desc">Yes. AI agents and chatbots can be integrated with approved data sources and business tools so they can answer questions, route requests or trigger defined workflow steps, with appropriate review and safeguards.</p>
              </div>
              <div>
                <h3 className="pillar-title">Does MindWorks provide web design and development?</h3>
                <p className="pillar-desc">MindWorks designs and develops business websites and custom web applications, from responsive marketing sites to dashboards, internal platforms and SaaS products.</p>
              </div>
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

        {/* MODERN TECHNOLOGY STACK — infinite marquee */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '3.5rem',
            paddingBottom: '4rem',
            overflow: 'hidden',
          }}
        >
          <div className="site-container">
            <h2 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', letterSpacing: '-0.02em', fontWeight: 500, textAlign: 'center' }}>
              BUILT WITH MODERN TECHNOLOGY.
            </h2>
          </div>

          {/* Marquee track */}
          <div
            style={{
              marginTop: '2.25rem',
              position: 'relative',
              overflow: 'hidden',
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                animation: 'tech-marquee 28s linear infinite',
                width: 'max-content',
              }}
            >
              {/* Render list twice for seamless loop */}
              {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    flexShrink: 0,
                    opacity: 0.75,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.75'}
                >
                  {tech.slug === 'openai' ? (
                    <RiOpenaiFill aria-hidden="true" focusable="false" color={tech.color} size={22} />
                  ) : (
                    <img
                      src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`}
                      alt={tech.name}
                      width={22}
                      height={22}
                      style={{ display: 'block', flexShrink: 0 }}
                      loading="lazy"
                    />
                  )}
                  <span
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--muted-foreground)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
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
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mindworksai/', Icon: FaLinkedin, color: '#0A66C2' },
                  { label: 'Instagram', href: 'https://www.instagram.com/mindworks.ai/', Icon: FaInstagram, color: '#E4405F' },
                  { label: 'X', href: 'https://x.com/mindworks_ai', Icon: FaXTwitter, color: '#FFFFFF' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--muted-foreground)',
                      textDecoration: 'none',
                      transition: 'color 0.25s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
                  >
                    <social.Icon aria-hidden="true" focusable="false" color={social.color} size="1rem" />
                    {social.label}
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
