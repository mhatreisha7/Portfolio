(
  function () {
    const ICONS = {
      github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
      link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
      arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
    };

    let modalOpen = false;

    function buildCard(p, idx) {
      return `
        <div class="project-card" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.title} details" style="transition-delay: ${idx * 80}ms">
          <img class="pr-image" src="${p.image}" alt="${p.title}" loading="lazy" />
          <div class="pr-info">
            <div class="pr-title">${p.title}</div>
            <p class="pr-desc">${p.shortDesc}</p>
            <div class="pr-tech-stack">
              ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
            </div>
            <div class="pr-links">
              ${p.demo ? `<a class="pr-link" href="${p.demo}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${ICONS.link} Live Demo</a>` : ""}
              <a class="pr-link" href="${p.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${ICONS.github} GitHub</a>
            </div>
          </div>
        </div>
      `;
    }

    function animateCards(list) {
      const cards = list.querySelectorAll(".project-card");
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      cards.forEach(c => obs.observe(c));
    }

    function renderProjects() {
      const list = document.getElementById("projects-list");
      if (!list || typeof projectsData === "undefined") return;
      list.innerHTML = projectsData.map((p, i) => buildCard(p, i)).join("");
      animateCards(list);

      list.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => openModal(card.dataset.id));
        card.addEventListener("keydown", e => {
          if (e.key === "Enter" || e.key === " ") openModal(card.dataset.id);
        });
      });
    }

    function openModal(id) {
      const p = projectsData.find(x => x.id === id);
      if (!p) return;

      document.getElementById("project-modal-title").textContent = p.title;
      document.getElementById("project-modal-body").innerHTML = `
        <img class="modal-image" src="${p.image}" alt="${p.title}" />
        <p class="modal-overview">${p.details.overview}</p>
        <div class="modal-highlights-label">Key Highlights</div>
        <ul class="modal-highlights">
          ${p.details.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>
        <div class="modal-tags">
          ${p.tech.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="modal-actions">
          <a class="btn-primary" href="${p.github}" target="_blank" rel="noopener">${ICONS.github}&nbsp;GitHub</a>
          ${p.demo ? `<a class="btn-outline" href="${p.demo}" target="_blank" rel="noopener">${ICONS.link}&nbsp;Live Demo</a>` : ""}
        </div>
      `;

      document.getElementById("project-modal").classList.add("open");
      document.body.style.overflow = "hidden";
      modalOpen = true;
    }

    function closeModal() {
      document.getElementById("project-modal").classList.remove("open");
      document.body.style.overflow = "";
      modalOpen = false;
    }

    function init() {
      const section = document.getElementById("projects");
      if (!section) return;

      section.innerHTML = `
        <div class="section-wrap">
          <span class="section-label">Selected Work</span>
          <h2 class="section-heading">Projects</h2>
          <div class="projects-grid" id="projects-list"></div>

          <div class="modal-overlay" id="project-modal" role="dialog" aria-modal="true">
            <div class="modal">
              <div class="modal-header">
                <span class="modal-title" id="project-modal-title"></span>
                <button class="modal-close" id="project-modal-close" aria-label="Close">✕</button>
              </div>
              <div class="modal-body" id="project-modal-body"></div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("project-modal-close").addEventListener("click", closeModal);
      document.getElementById("project-modal").addEventListener("click", e => {
        if (e.target === e.currentTarget) closeModal();
      });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modalOpen) closeModal();
      });

      renderProjects();
    }

    document.addEventListener("DOMContentLoaded", init);
  }
)();
