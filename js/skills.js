(function () {

  const CATEGORIES = [
    { key: "languages",       label: "Languages",        icon: "⌨️" },
    { key: "frameworks",      label: "Frameworks",       icon: "⚙️" },
    { key: "webTechnologies", label: "Web Tech",         icon: "🌐" },
    { key: "concepts",        label: "Concepts",         icon: "💡" },
    { key: "tools",           label: "Tools",            icon: "🛠️" },
  ];

  const LEVEL_COLOR = {
    "Advanced":     "var(--accent)",
    "Intermediate": "var(--secondary)",
    "Beginner":     "var(--text-dim)",
  };

  function buildSkillBar(skill) {
    const color = LEVEL_COLOR[skill.level] || "var(--accent)";
    return `
      <div class="sk-bar-item">
        <div class="sk-bar-header">
          <div class="sk-bar-name-wrap">
            <span class="sk-bar-name">${skill.name}</span>
            ${skill.sublabel ? `<span class="sk-bar-sub">${skill.sublabel}</span>` : ""}
          </div>
          <span class="sk-level-badge sk-level-${skill.level.toLowerCase()}">${skill.level}</span>
        </div>
        <div class="sk-track" role="progressbar" aria-valuenow="${skill.pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="sk-fill" style="--target-w:${skill.pct}%; background:${color}" data-pct="${skill.pct}"></div>
        </div>
      </div>
    `;
  }

  function buildTabPanel(cat) {
    const skills = skillsData[cat.key] || [];
    if (!skills.length) return "";
    return `
      <div class="sk-panel" id="sk-panel-${cat.key}" role="tabpanel" aria-labelledby="sk-tab-${cat.key}" hidden>
        <div class="sk-bars">
          ${skills.map(buildSkillBar).join("")}
        </div>
      </div>
    `;
  }

  function buildTabButton(cat, isFirst) {
    return `
      <button class="sk-tab${isFirst ? " active" : ""}"
              id="sk-tab-${cat.key}"
              role="tab"
              aria-selected="${isFirst}"
              aria-controls="sk-panel-${cat.key}"
              data-key="${cat.key}">
        <span class="sk-tab-icon">${cat.icon}</span>
        <span class="sk-tab-label">${cat.label}</span>
      </button>
    `;
  }

  function animateBars(panel) {
    panel.querySelectorAll(".sk-fill").forEach((el, i) => {
      const target = el.dataset.pct + "%";
      el.style.width = "0%";
      setTimeout(() => {
        el.style.transition = `width 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 80}ms`;
        el.style.width = target;
      }, 60);
    });
  }

  function switchTab(tabsEl, key) {
    tabsEl.querySelectorAll(".sk-tab").forEach(t => {
      const active = t.dataset.key === key;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active);
    });
    tabsEl.closest(".skills-inner").querySelectorAll(".sk-panel").forEach(p => {
      const show = p.id === `sk-panel-${key}`;
      p.hidden = !show;
      if (show) animateBars(p);
    });
  }

  function init() {
    const section = document.getElementById("skills");
    if (!section || typeof skillsData === "undefined") return;

    const validCats = CATEGORIES.filter(c => (skillsData[c.key] || []).length > 0);

    section.innerHTML = `
      <div class="section-wrap">
        <span class="section-label">My Expertise</span>
        <h2 class="section-heading">Skills</h2>
        <div class="skills-inner">
          <div class="sk-tabs" role="tablist" aria-label="Skill categories">
            ${validCats.map((c, i) => buildTabButton(c, i === 0)).join("")}
          </div>
          <div class="sk-panels">
            ${validCats.map((c, i) => buildTabPanel(c, i === 0)).join("")}
          </div>
        </div>
      </div>
    `;

    // Show first panel
    const firstPanel = section.querySelector(".sk-panel");
    if (firstPanel) firstPanel.hidden = false;

    // Tab clicks
    section.querySelector(".sk-tabs").addEventListener("click", e => {
      const btn = e.target.closest(".sk-tab");
      if (btn) switchTab(section.querySelector(".sk-tabs"), btn.dataset.key);
    });

    // Keyboard navigation
    section.querySelector(".sk-tabs").addEventListener("keydown", e => {
      const tabs = [...section.querySelectorAll(".sk-tab")];
      const idx  = tabs.indexOf(document.activeElement);
      if (e.key === "ArrowRight" && idx < tabs.length - 1) { tabs[idx + 1].focus(); tabs[idx + 1].click(); }
      if (e.key === "ArrowLeft"  && idx > 0)               { tabs[idx - 1].focus(); tabs[idx - 1].click(); }
    });

    // IntersectionObserver — animate bars when section scrolls into view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activePanel = section.querySelector(".sk-panel:not([hidden])");
          if (activePanel) animateBars(activePanel);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(section);
  }

  document.addEventListener("DOMContentLoaded", init);
})();