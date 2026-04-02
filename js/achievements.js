// js/achievements.js — Achievement cards + Leadership sidebar
(function () {

  const BADGE_ICON = {
    "Certification": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    "Simulation":    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    "Internship":    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
    "Award":         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  };

  function buildAchCard(a) {
    const icon = BADGE_ICON[a.badge] || BADGE_ICON["Award"];
    return `
      <div class="ach-card ach-reveal">
        <div class="ach-card-top">
          <div class="ach-icon-wrap">${icon}</div>
          <div class="ach-card-meta">
            <span class="ach-badge-pill">${a.badge}</span>
            <span class="ach-period">${a.period}</span>
          </div>
        </div>
        <div class="ach-card-body">
          <div class="ach-org">${a.org}</div>
          <h3 class="ach-title">${a.title}</h3>
          <p class="ach-desc">${a.description}</p>
        </div>
        ${a.tags ? `<div class="ach-tags">${a.tags.map(t => `<span class="ach-tag">${t}</span>`).join("")}</div>` : ""}
        ${a.link ? `<a class="ach-link" href="${a.link}" target="_blank" rel="noopener">View credential ↗</a>` : ""}
      </div>`;
  }

  function buildActivityItem(a) {
    const initials = a.icon && a.icon.length <= 4 ? a.icon.toUpperCase() : a.title.charAt(0).toUpperCase();
    return `
      <div class="act-item ach-reveal">
        <div class="act-icon">${initials}</div>
        <div class="act-body">
          <div class="act-title">${a.title}</div>
          <div class="act-org-period"><span>${a.org}</span><span class="act-dot">·</span><span>${a.period}</span></div>
          <p class="act-desc">${a.description}</p>
        </div>
      </div>`;
  }

  function init() {
    const section = document.getElementById("achievements");
    if (!section || typeof experienceData === "undefined") return;

    const { achievements = [], activities = [] } = experienceData;

    section.innerHTML = `
      <div class="section-wrap">
        <span class="section-label">Recognition & Leadership</span>
        <h2 class="section-heading">Achievements</h2>
        <div class="ach-layout">
          <div class="ach-grid">
            ${achievements.map(buildAchCard).join("")}
          </div>
          ${activities.length ? `
          <aside class="ach-sidebar">
            <div class="ach-sidebar-card">
              <h3 class="ach-sidebar-title">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Leadership
              </h3>
              <div class="act-list">
                ${activities.map(buildActivityItem).join("")}
              </div>
            </div>
          </aside>` : ""}
        </div>
      </div>`;

    setupReveal();
  }

  function setupReveal() {
    const els = document.querySelectorAll(".ach-reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), i * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach(el => obs.observe(el));
  }

  document.addEventListener("DOMContentLoaded", init);
})();