(() => {
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
    document.documentElement.style.backgroundColor = theme === 'light' ? '#f7f7f5' : '#000000';
  };

  const savedTheme = localStorage.getItem('mindworks-theme');
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  const existingToggle = document.querySelector('.theme-toggle-btn');
  if (!existingToggle) {
    const rightContainers = document.querySelectorAll('.nav-pill > div, .service-nav-pill > div');
    rightContainers.forEach((container) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'theme-toggle-btn';
      button.setAttribute('aria-label', 'Switch color theme');
      button.innerHTML = document.documentElement.dataset.theme === 'dark'
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z"/></svg>';
      button.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('mindworks-theme', nextTheme);
        applyTheme(nextTheme);
        window.location.reload();
      });
      container.prepend(button);
    });
  }

  const overlay = document.createElement('div');
  overlay.className = 'page-navigation-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || link.target === '_blank') return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    if (url.origin !== window.location.origin || url.pathname.startsWith('/api/') || href.includes('#')) return;

    link.addEventListener('pointerenter', () => {
      const prefetch = document.createElement('link');
      prefetch.rel = 'prefetch';
      prefetch.href = url.pathname + url.search;
      if (!document.querySelector(`link[rel="prefetch"][href="${prefetch.href}"]`)) {
        document.head.appendChild(prefetch);
      }
    }, { passive: true, once: true });

    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();

      overlay.classList.add('is-visible');
      const destination = url.pathname + url.search;
      window.setTimeout(() => {
        window.location.assign(destination);
      }, 80);
    });
  });

  window.addEventListener('pageshow', () => {
    overlay.classList.remove('is-visible');
  });
})();
