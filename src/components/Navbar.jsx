import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header-fixed">
      <nav aria-label="Primary" className={`nav-pill ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="brand-logo">
          <span className="logo-text">MINDWORKS</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/* Right CTA & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <a href="#discovery" className="nav-cta-btn">
            Book a Discovery Call
            <span className="arrow">→</span>
          </a>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span style={{ position: 'relative', display: 'block', width: '1rem', height: '0.625rem' }}>
              <span
                className="hamburger-line"
                style={{
                  top: mobileMenuOpen ? '0.25rem' : '0',
                  transform: mobileMenuOpen ? 'rotate(45deg)' : 'none',
                }}
              />
              <span
                className="hamburger-line"
                style={{
                  top: mobileMenuOpen ? '0.25rem' : '0.55rem',
                  transform: mobileMenuOpen ? 'rotate(-45deg)' : 'none',
                }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: 'var(--foreground)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <a
                href="#discovery"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Book a Discovery Call
                <span className="arrow">→</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
