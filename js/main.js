/* =========================================================================
   NEXORA — main.js
   Shared header/footer injection + interactions & animations
   ========================================================================= */
(function () {
  'use strict';

  /* ----------------------------- Icon set ------------------------------- */
  // Inline Lucide icons (MIT) to keep the site self-contained (no CDN).
  const I = {
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z"/></svg>',
    printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.94 14.34A2 2 0 0 0 8.66 13L3.66 11a2 2 0 0 1 0-3.78L8.66 5.2a2 2 0 0 0 1.28-1.28l1.95-5a2 2 0 0 1 3.78 0l1.95 5a2 2 0 0 0 1.28 1.28l4.99 1.95a2 2 0 0 1 0 3.78l-4.99 1.95a2 2 0 0 0-1.28 1.28l-1.95 5a2 2 0 0 1-3.78 0Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  };

  /* --------------------------- Service data ----------------------------- */
  const SERVICES = [
    { id: 'webseiten', icon: 'globe', title: 'Webseiten', desc: 'Schnelle, moderne Auftritte' },
    { id: 'onlineshops', icon: 'cart', title: 'Onlineshops', desc: 'Verkaufsstarke E-Commerce-Lösungen' },
    { id: 'software', icon: 'code', title: 'Softwareentwicklung', desc: 'Webanwendungen & individuelle Tools' },
    { id: 'corporate-design', icon: 'palette', title: 'Corporate Design', desc: 'Logos & starke Markenidentität' },
    { id: 'printdesign', icon: 'printer', title: 'Printdesign', desc: 'Flyer, Karten & Speisekarten' },
    { id: 'seo', icon: 'search', title: 'SEO', desc: 'Sichtbar bei Google & Co.' },
    { id: 'hosting', icon: 'server', title: 'Hosting', desc: 'Sicher, schnell, zuverlässig' },
    { id: 'wartung', icon: 'wrench', title: 'Wartung', desc: 'Pflege, Updates & Support' },
    { id: 'ki-loesungen', icon: 'sparkles', title: 'KI-Lösungen', desc: 'Automatisierung & Chatbots' },
  ];

  /* ----------------------------- Header --------------------------------- */
  function megaItems() {
    return SERVICES.map(
      (s) => `
      <a class="mega-item" href="leistungen.html#${s.id}">
        <span class="mi-icon">${I[s.icon]}</span>
        <span><strong>${s.title}</strong><span>${s.desc}</span></span>
      </a>`
    ).join('');
  }

  const NAV = [
    { href: 'index.html', label: 'Home', page: 'home' },
    { href: 'leistungen.html', label: 'Leistungen', page: 'leistungen', mega: true },
    { href: 'portfolio.html', label: 'Portfolio', page: 'portfolio' },
    { href: 'ueber-uns.html', label: 'Über uns', page: 'about' },
    { href: 'preise.html', label: 'Preise', page: 'preise' },
    { href: 'blog.html', label: 'Blog', page: 'blog' },
  ];

  function buildHeader(current) {
    const links = NAV.map((n) => {
      if (n.mega) {
        return `
        <li class="has-mega">
          <a class="nav-trigger ${current === n.page ? 'active' : ''}" href="${n.href}">${n.label} ${I.chevron}</a>
          <div class="mega">
            <div class="mega-grid">${megaItems()}</div>
            <div class="mega-foot">
              <span>Alle Leistungen aus einer Hand – von der Idee bis zum Launch.</span>
              <a class="link-arrow" href="leistungen.html">Alle Leistungen ${I.arrow}</a>
            </div>
          </div>
        </li>`;
      }
      return `<li><a href="${n.href}" class="${current === n.page ? 'active' : ''}">${n.label}</a></li>`;
    }).join('');

    return `
    <a class="skip-link" href="#main">Zum Inhalt springen</a>
    <header class="navbar" id="navbar">
      <nav class="nav-inner" aria-label="Hauptnavigation">
        <a class="nav-logo" href="index.html" aria-label="Nexora Startseite">
          <img src="assets/logo.svg" alt="" width="34" height="34" />
          <span>Nexora</span>
        </a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="Farbschema wechseln" type="button">
            <span class="icon-moon">${I.moon}</span><span class="icon-sun">${I.sun}</span>
          </button>
          <a class="btn btn-primary" href="kontakt.html">Projekt starten ${I.arrow}</a>
          <button class="nav-burger" id="nav-burger" aria-label="Menü öffnen" aria-expanded="false" type="button">${I.menu}</button>
        </div>
      </nav>
    </header>
    <div class="mobile-menu" id="mobile-menu">
      ${NAV.map((n) => `<a href="${n.href}" class="${current === n.page ? 'active' : ''}">${n.label} ${I.arrow}</a>`).join('')}
      <div class="mm-group-label">Leistungen</div>
      ${SERVICES.map((s) => `<a class="mm-sub" href="leistungen.html#${s.id}">${s.title}</a>`).join('')}
      <a class="btn btn-primary" href="kontakt.html">Projekt starten ${I.arrow}</a>
    </div>`;
  }

  /* ----------------------------- Footer --------------------------------- */
  function buildFooter() {
    const year = new Date().getFullYear();
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="nav-logo" href="index.html">
              <img src="assets/logo.svg" alt="" width="34" height="34" /><span>Nexora</span>
            </a>
            <p>Digitalagentur für Webseiten, Software, Design & KI. Wir bringen kleine und mittelständische Unternehmen digital nach vorne.</p>
            <div class="footer-social">
              <a href="#" aria-label="LinkedIn">${I.linkedin}</a>
              <a href="#" aria-label="Instagram">${I.instagram}</a>
              <a href="#" aria-label="Facebook">${I.facebook}</a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Leistungen</h5>
            <ul>
              <li><a href="leistungen.html#webseiten">Webseiten</a></li>
              <li><a href="leistungen.html#onlineshops">Onlineshops</a></li>
              <li><a href="leistungen.html#software">Software</a></li>
              <li><a href="leistungen.html#corporate-design">Corporate Design</a></li>
              <li><a href="leistungen.html#ki-loesungen">KI-Lösungen</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Unternehmen</h5>
            <ul>
              <li><a href="ueber-uns.html">Über uns</a></li>
              <li><a href="portfolio.html">Portfolio</a></li>
              <li><a href="preise.html">Preise</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="faq.html">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Service</h5>
            <ul>
              <li><a href="leistungen.html#seo">SEO</a></li>
              <li><a href="leistungen.html#hosting">Hosting</a></li>
              <li><a href="leistungen.html#wartung">Wartung</a></li>
              <li><a href="leistungen.html#printdesign">Printdesign</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Kontakt</h5>
            <ul>
              <li><a href="mailto:hallo@nexora.de">hallo@nexora.de</a></li>
              <li><a href="tel:+4915112345678">+49 151 123 456 78</a></li>
              <li><a href="kontakt.html">Kontaktformular</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} Nexora Digital Solutions. Alle Rechte vorbehalten.</span>
          <div class="fb-links">
            <a href="impressum.html">Impressum</a>
            <a href="datenschutz.html">Datenschutz</a>
            <a href="faq.html">FAQ</a>
          </div>
        </div>
      </div>
    </footer>`;
  }

  /* ------------------------- Interactions ------------------------------- */
  function initHeaderBehavior() {
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('mobile-menu');
    const toggleMenu = (open) => {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      burger.innerHTML = open ? I.x : I.menu;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };
    burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
  }

  function initTheme() {
    const stored = localStorage.getItem('nexora-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nexora-theme', next);
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  function initCounters() {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target % 1 === 0 ? Math.floor(eased * target) : (eased * target).toFixed(1);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
  }

  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        q.setAttribute('aria-expanded', String(open));
        a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
      });
    });
  }

  function initFilters() {
    const chips = document.querySelectorAll('.chip[data-filter]');
    if (!chips.length) return;
    const items = document.querySelectorAll('[data-category]');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.dataset.filter;
        items.forEach((item) => {
          const show = f === 'all' || item.dataset.category === f;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const success = document.getElementById('form-success');
      form.reset();
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  function initParallax() {
    const layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      layers.forEach((l) => {
        const speed = parseFloat(l.dataset.parallax) || 0.2;
        l.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

  /* ------------------------------- Init --------------------------------- */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    const current = document.body.dataset.page || '';
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.innerHTML = buildHeader(current);
    if (footerMount) footerMount.innerHTML = buildFooter();

    initTheme();
    initHeaderBehavior();
    initReveal();
    initCounters();
    initFAQ();
    initFilters();
    initForm();
    initParallax();
  });

  // expose icons for inline page use if needed
  window.NEXORA_ICONS = I;
})();
