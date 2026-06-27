/* ==========================================================================
   NEXORA — Interactions & Animations
   Scroll reveal, counters, FAQ accordion, portfolio filter, forms, parallax.
   Progressive enhancement: works without GSAP; richer if GSAP present.
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = (el.dataset.count.split(".")[1] || "").length;
      const dur = reduceMotion ? 0 : 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur || 1, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = (target * eased).toFixed(decimals);
        el.textContent = Number(val).toLocaleString("de-DE") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- FAQ / accordion ---------- */
  document.querySelectorAll(".acc-trigger").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      const panel = item.querySelector(".acc-panel");
      const isOpen = item.classList.contains("is-open");
      // close siblings within same accordion
      const group = item.closest(".accordion");
      if (group) {
        group.querySelectorAll(".acc-item.is-open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            other.querySelector(".acc-panel").style.maxHeight = null;
            other.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
          }
        });
      }
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
    });
  });

  /* ---------- Portfolio filter ---------- */
  const filters = document.querySelectorAll(".filter-pill");
  if (filters.length) {
    const projects = document.querySelectorAll("[data-category]");
    filters.forEach((pill) => {
      pill.addEventListener("click", () => {
        filters.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        const cat = pill.dataset.filter;
        projects.forEach((proj) => {
          const show = cat === "all" || proj.dataset.category === cat;
          proj.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------- Contact / form handling (no backend: graceful demo) ---------- */
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const success = form.querySelector(".form-success");
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Wird gesendet …"; }
      window.setTimeout(() => {
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label; }
        if (success) {
          success.classList.add("is-visible");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
          if (window.NEXORA && window.NEXORA.renderIcons) window.NEXORA.renderIcons();
        }
      }, 900);
    });
  });

  /* ---------- Marquee: duplicate track for seamless loop ---------- */
  document.querySelectorAll(".marquee__track").forEach((track) => {
    if (track.dataset.cloned) return;
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = "true";
  });

  /* ---------- Parallax (light, rAF-throttled) ---------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Optional GSAP hero flourish ---------- */
  if (window.gsap && !reduceMotion) {
    const heroItems = document.querySelectorAll("[data-hero-anim] > *");
    if (heroItems.length) {
      window.gsap.from(heroItems, {
        y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1,
      });
    }
  }
})();
