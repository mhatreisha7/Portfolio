// js/navbar.js — Vertical Sidebar Nav with scroll locking and active section tracking
(function () {
  const NAV_ICONS = {
    home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    projects: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    skills: `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    experience: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    education: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    about: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    contact: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  };

  const NAV_ITEMS = [
    { href: "#hero",       label: "Home",       icon: NAV_ICONS.home },
    { href: "#projects",   label: "Projects",   icon: NAV_ICONS.projects },
    { href: "#skills",     label: "Skills",     icon: NAV_ICONS.skills },
    { href: "#experience", label: "Exp",        icon: NAV_ICONS.experience },
    { href: "#education",  label: "Edu",        icon: NAV_ICONS.education },
    { href: "#about",      label: "About",      icon: NAV_ICONS.about },
    { href: "#contact",    label: "Contact",    icon: NAV_ICONS.contact },
  ];

  function buildNavLinks() {
    const ul = document.getElementById("nav-links");
    if (!ul) return;
    ul.innerHTML = "";
    NAV_ITEMS.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.setAttribute("data-section", item.href.slice(1));
      a.innerHTML = `
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
      `;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function init() {
    buildNavLinks();

    const navbar    = document.getElementById("navbar");
    const progress  = document.getElementById("scroll-progress");
    const hamburger = document.getElementById("nav-hamburger");
    const navLinks  = document.getElementById("nav-links");
    const links     = () => document.querySelectorAll(".nav-links a");

    // ── Scroll handler ──
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;

      if (navbar) navbar.classList.toggle("scrolled", scrollTop > 50);

      // Progress bar
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + "%";

      // Active link
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach(s => {
        if (scrollTop >= s.offsetTop - 180) current = s.id;
      });
      links().forEach(a => {
        const sec = a.getAttribute("data-section");
        a.classList.toggle("active", sec === current);
      });
    }, { passive: true });

    // ── Mobile menu ──
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.classList.toggle("open", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
        // Lock body scroll when mobile menu is open
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      // Close on link click
      navLinks.addEventListener("click", e => {
        const a = e.target.closest("a");
        if (!a) return;
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    }

    // Smooth scroll for all nav anchors
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
