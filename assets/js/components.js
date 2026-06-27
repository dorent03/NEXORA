/* ==========================================================================
   NEXORA — Layout Components
   Injects the navbar (with mega-menu), mobile menu and footer on every page,
   handles theme switching, scroll state, active link, scroll progress.
   Each page sets:  <body data-page="..." data-base="" | "../">
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  const BASE = document.body.dataset.base || "";
  const PAGE = document.body.dataset.page || "";
  const u = (p) => BASE + p; // build URL with base prefix

  /* ---------- Data ---------- */
  const SERVICES = [
    { slug: "webseiten",          label: "Webseiten",            desc: "Schnelle, moderne Websites",   icon: "monitor" },
    { slug: "onlineshops",        label: "Onlineshops",          desc: "Verkaufsstarke Shops",         icon: "shopping-bag" },
    { slug: "softwareentwicklung",label: "Softwareentwicklung",  desc: "Web-Apps & Individualsoftware", icon: "code-2" },
    { slug: "corporate-design",   label: "Corporate Design",     desc: "Logo & Markenidentität",       icon: "palette" },
    { slug: "printdesign",        label: "Printdesign",          desc: "Flyer, Karten & Speisekarten", icon: "printer" },
    { slug: "seo",                label: "SEO",                  desc: "Sichtbar bei Google",          icon: "search" },
    { slug: "hosting",            label: "Hosting",              desc: "Sicher & DSGVO-konform",       icon: "server" },
    { slug: "wartung",            label: "Wartung",              desc: "Pflege & Support",             icon: "wrench" },
    { slug: "ki-loesungen",       label: "KI-Lösungen",          desc: "Automatisierung & Chatbots",   icon: "sparkles" },
  ];

  const NAV = [
    { label: "Start", href: "index.html", page: "home" },
    { label: "Leistungen", href: "leistungen.html", page: "leistungen", mega: true },
    { label: "Portfolio", href: "portfolio.html", page: "portfolio" },
    { label: "Über uns", href: "ueber-uns.html", page: "ueber-uns" },
    { label: "Preise", href: "preise.html", page: "preise" },
    { label: "Blog", href: "blog.html", page: "blog" },
  ];

  /* ---------- Build mega menu ---------- */
  function megaMenu() {
    const half = Math.ceil(SERVICES.length / 2);
    const col = (items) => items.map((s) => `
      <a class="mega__item" href="${u("leistungen/" + s.slug + ".html")}">
        <span class="icon-wrap"><i data-lucide="${s.icon}" class="icon"></i></span>
        <span>
          <span class="label">${s.label}</span>
          <span class="desc">${s.desc}</span>
        </span>
      </a>`).join("");

    return `
      <div class="mega" role="menu" aria-label="Leistungen">
        <div class="mega__grid">
          <div class="mega__feature">
            <div>
              <h4>Alles aus einer Hand</h4>
              <p>Von der Idee bis zum Launch – Design, Entwicklung und Marketing kombiniert für messbares Wachstum.</p>
            </div>
            <a class="mega-cta" href="${u("leistungen.html")}">Alle Leistungen <i data-lucide="arrow-right" class="icon" style="width:16px;height:16px"></i></a>
          </div>
          <div class="mega__col"><h5>Design & Web</h5>${col(SERVICES.slice(0, half))}</div>
          <div class="mega__col"><h5>Technik & Marketing</h5>${col(SERVICES.slice(half))}</div>
        </div>
      </div>`;
  }

  /* ---------- Build navbar ---------- */
  function navbar() {
    const links = NAV.map((n) => {
      const active = n.page === PAGE ? " is-active" : "";
      if (n.mega) {
        return `<li class="has-mega">
          <a class="nav-link${active}" href="${u(n.href)}" aria-haspopup="true" aria-expanded="false">
            ${n.label} <i data-lucide="chevron-down" class="chev"></i>
          </a>
          ${megaMenu()}
        </li>`;
      }
      return `<li><a class="nav-link${active}" href="${u(n.href)}">${n.label}</a></li>`;
    }).join("");

    return `
    <a class="skip-link" href="#main">Zum Inhalt springen</a>
    <header class="navbar" id="navbar">
      <div class="navbar__inner">
        <a class="brand" href="${u("index.html")}" aria-label="Nexora Startseite">
          <img class="brand__mark" src="${u("assets/img/logo-mark.svg")}" alt="" width="34" height="34">
          <span class="brand__text">NEXORA</span>
        </a>
        <nav aria-label="Hauptnavigation">
          <ul class="nav-links">${links}</ul>
        </nav>
        <div class="nav-actions">
          <button class="theme-toggle" id="themeToggle" type="button" aria-label="Farbschema wechseln">
            <i data-lucide="sun" class="icon icon-sun"></i>
            <i data-lucide="moon" class="icon icon-moon"></i>
          </button>
          <a class="btn btn--primary" href="${u("kontakt.html")}">Projekt starten <i data-lucide="arrow-right" class="icon arrow"></i></a>
          <button class="hamburger" id="hamburger" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobileMenu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="nav-overlay" id="navOverlay"></div>
    ${mobileMenu()}`;
  }

  /* ---------- Build mobile menu ---------- */
  function mobileMenu() {
    const sub = SERVICES.map((s) =>
      `<a href="${u("leistungen/" + s.slug + ".html")}">${s.label}</a>`).join("");
    const items = NAV.map((n) => {
      const active = n.page === PAGE ? " is-active" : "";
      if (n.mega) {
        return `<div class="m-accordion">
          <button class="m-link" type="button" aria-expanded="false">
            ${n.label} <i data-lucide="chevron-down" class="chev icon"></i>
          </button>
          <div class="m-accordion__panel"><div class="m-sub">
            <a href="${u("leistungen.html")}" style="font-weight:600">Alle Leistungen</a>${sub}
          </div></div>
        </div>`;
      }
      return `<a class="m-link${active}" href="${u(n.href)}">${n.label}</a>`;
    }).join("");

    return `
    <nav class="mobile-menu" id="mobileMenu" aria-label="Mobile Navigation">
      ${items}
      <a class="m-link${PAGE === "kontakt" ? " is-active" : ""}" href="${u("kontakt.html")}">Kontakt</a>
      <a class="m-link${PAGE === "faq" ? " is-active" : ""}" href="${u("faq.html")}">FAQ</a>
      <a class="btn btn--primary btn--block mobile-menu__cta" href="${u("kontakt.html")}">Projekt starten <i data-lucide="arrow-right" class="icon arrow"></i></a>
    </nav>`;
  }

  /* ---------- Build footer ---------- */
  function footer() {
    const year = document.body.dataset.year || "2026";
    const servCols = SERVICES.slice(0, 6).map((s) =>
      `<a href="${u("leistungen/" + s.slug + ".html")}">${s.label}</a>`).join("");
    return `
    <footer class="footer">
      <div class="container container--wide">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="brand" href="${u("index.html")}">
              <img class="brand__mark" src="${u("assets/img/logo-mark.svg")}" alt="" width="34" height="34">
              <span class="brand__text">NEXORA</span>
            </a>
            <p>Digitalagentur für Webseiten, Software, Design und Marketing – damit kleine und mittelständische Unternehmen online wachsen.</p>
            <div class="socials">
              <a href="#" aria-label="LinkedIn"><i data-lucide="linkedin" class="icon"></i></a>
              <a href="#" aria-label="Instagram"><i data-lucide="instagram" class="icon"></i></a>
              <a href="#" aria-label="Facebook"><i data-lucide="facebook" class="icon"></i></a>
              <a href="#" aria-label="GitHub"><i data-lucide="github" class="icon"></i></a>
            </div>
          </div>
          <div class="footer__col">
            <h5>Leistungen</h5>
            ${servCols}
          </div>
          <div class="footer__col">
            <h5>Unternehmen</h5>
            <a href="${u("ueber-uns.html")}">Über uns</a>
            <a href="${u("portfolio.html")}">Portfolio</a>
            <a href="${u("preise.html")}">Preise</a>
            <a href="${u("blog.html")}">Blog</a>
            <a href="${u("faq.html")}">FAQ</a>
          </div>
          <div class="footer__col">
            <h5>Ressourcen</h5>
            <a href="${u("leistungen.html")}">Alle Leistungen</a>
            <a href="${u("kontakt.html")}">Kontakt</a>
            <a href="${u("leistungen/ki-loesungen.html")}">KI-Lösungen</a>
            <a href="${u("leistungen/seo.html")}">SEO</a>
          </div>
          <div class="footer__col">
            <h5>Kontakt</h5>
            <a href="mailto:hallo@nexora.de">hallo@nexora.de</a>
            <a href="tel:+4989123456789">+49 89 123 456 789</a>
            <a href="${u("kontakt.html")}">Maximilianstraße 12<br>80539 München</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${year} Nexora Digital Solutions. Alle Rechte vorbehalten.</span>
          <nav aria-label="Rechtliches">
            <a href="${u("impressum.html")}">Impressum</a>
            <a href="${u("datenschutz.html")}">Datenschutz</a>
            <a href="${u("faq.html")}">FAQ</a>
          </nav>
        </div>
      </div>
    </footer>`;
  }

  /* ---------- Inject ---------- */
  const navMount = document.getElementById("site-nav");
  const footMount = document.getElementById("site-footer");
  if (navMount) navMount.innerHTML = navbar();
  if (footMount) footMount.innerHTML = footer();

  /* global UI chrome */
  document.body.insertAdjacentHTML("beforeend",
    '<div class="scroll-progress" id="scrollProgress"></div>' +
    '<button class="to-top" id="toTop" aria-label="Nach oben scrollen"><i data-lucide="arrow-up" class="icon"></i></button>');

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const stored = localStorage.getItem("nexora-theme");
  if (stored) root.setAttribute("data-theme", stored);
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("nexora-theme", next);
    });
  }

  /* ---------- Navbar scroll state + progress + to-top ---------- */
  const navbarEl = document.getElementById("navbar");
  const progress = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");
  function onScroll() {
    const y = window.scrollY;
    if (navbarEl) navbarEl.classList.toggle("is-scrolled", y > 12);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("navOverlay");
  function closeMenu() {
    document.body.classList.remove("menu-open");
    if (hamburger) hamburger.setAttribute("aria-expanded", "false");
  }
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      hamburger.setAttribute("aria-expanded", String(open));
    });
  }
  if (overlay) overlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* mobile accordions */
  document.querySelectorAll(".m-accordion__panel").length; // noop guard
  document.querySelectorAll(".m-accordion .m-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const acc = btn.closest(".m-accordion");
      const open = acc.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Render Lucide icons ---------- */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  if (window.lucide) renderIcons();
  else window.addEventListener("load", renderIcons);
  // expose for late-loading pages
  window.NEXORA = window.NEXORA || {};
  window.NEXORA.renderIcons = renderIcons;
})();
