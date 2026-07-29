/* ════════════════════════════════════════════
   Nito Industries — script.js
════════════════════════════════════════════ */

(() => {

  /* ── Navbar scroll ─────────────────────── */
  const navbar = document.getElementById('navbar');
  function updateNav() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile menu ────────────────────────── */
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ─────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── Smooth scroll ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12,
        behavior: 'smooth'
      });
    });
  });

  /* ── Contact form → mailto ──────────────── */
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const name    = d.get('name')         || '';
      const phone   = d.get('phone')        || '';
      const email   = d.get('email')        || '';
      const type    = d.get('project_type') || 'Not specified';
      const message = d.get('message')      || '';
      const body = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : '',
        `Project type: ${type}`,
        '',
        message
      ].filter(Boolean).join('%0A');
      window.location.href =
        `mailto:thomas@nitoindustries.co.za?subject=Website enquiry — ${encodeURIComponent(name)}&body=${body}`;
    });
  }

})();
