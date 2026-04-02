(function () {

  // Category card icons (SVG)
  const CAT_ICONS = {
    languages:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    frameworks:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
    webTechnologies: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    concepts:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
    tools:           `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  };

  const CATEGORIES = [
    { key: "languages",       label: "Languages" },
    { key: "frameworks",      label: "Frameworks" },
    { key: "webTechnologies", label: "Web Tech" },
    { key: "concepts",        label: "Concepts" },
    { key: "tools",           label: "Tools" },
  ];

  function buildCategoryCard(cat) {
    const skills = skillsData[cat.key] || [];
    if (!skills.length) return "";
    const icon = CAT_ICONS[cat.key] || CAT_ICONS.tools;
    const chips = skills.map(s => `<span class="sk-chip">${s.name}</span>`).join("");
    return `
      <div class="sk-cat-card sk-reveal">
        <div class="sk-cat-header">
          <div class="sk-cat-icon">${icon}</div>
          <span class="sk-cat-label">${cat.label}</span>
        </div>
        <div class="sk-chips">${chips}</div>
      </div>`;
  }

  function init() {
    const section = document.getElementById("skills");
    if (!section || typeof skillsData === "undefined") return;

    const validCats = CATEGORIES.filter(c => (skillsData[c.key] || []).length > 0);

    section.innerHTML = `
      <div class="section-wrap">
        <span class="section-label">My Expertise</span>
        <h2 class="section-heading">Skills</h2>
        <div class="sk-cat-grid">
          ${validCats.map(buildCategoryCard).join("")}
        </div>
      </div>
    `;

    // Reveal on scroll
    const els = section.querySelectorAll(".sk-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
