(function () {
  const ICONS = {
    github:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    mail:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    eye:      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  };

  function render() {
    const section = document.getElementById("hero");
    if (!section || typeof heroData === "undefined") return;

    const nameParts = heroData.name.split(" ");
    const firstName = nameParts[0];
    const lastName  = nameParts.slice(1).join(" ");

    section.innerHTML = `
      <div class="hero-wrap">
        <div class="hero-left">

          <div class="hero-eyebrow">
            <span class="hero-available-dot"></span>
            <span class="hero-available-text">Available for opportunities</span>
          </div>

          <h1 class="hero-heading">
            <span class="hero-name-first">${firstName}</span>
            <em class="hero-name-last">${lastName}.</em>
          </h1>

          <div class="hero-role-line">
            <span class="hero-role-badge">${heroData.title}</span>
          </div>

          <p class="hero-tagline">${heroData.tagline}</p>

          <div class="hero-actions">
            <button class="btn-primary" id="view-resume-btn">
              ${ICONS.eye}&nbsp;${heroData.cta.view}
            </button>
          </div>

          <div class="hero-social">
            <a href="https://github.com/mhatreisha7" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">${ICONS.github}</a>
            <a href="https://www.linkedin.com/in/ishamhatre2702/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">${ICONS.linkedin}</a>
            <a href="mailto:ishamhatre2702@gmail.com" title="Email" aria-label="Email">${ICONS.mail}</a>
          </div>

        </div>

        <div class="hero-right">
          <div class="hero-photo-wrap">
            <div class="hero-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85"
                alt="Isha Mhatre"
              />
            </div>
            <div class="hero-photo-accent-corner" aria-hidden="true"></div>
            <div class="hero-status-badge" aria-hidden="true">
              <span class="hero-status-dot"></span>
              <span class="hero-status-text">Open to work &middot; ${heroData.location}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Resume Modal -->
      <div id="resume-view-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="resume-view-title">
        <div class="modal resume-modal">
          <div class="modal-header">
            <span class="modal-title" id="resume-view-title">Resume</span>
            <div style="display:flex;gap:0.75rem;align-items:center">
              <a class="resume-view-dl-btn" id="resume-view-download" aria-label="Download PDF">
                ${ICONS.download} Download PDF
              </a>
              <button class="modal-close" id="resume-view-close" aria-label="Close modal">&#x2715;</button>
            </div>
          </div>
          <div id="resume-doc-container" class="modal-body" style="padding:0;overflow:hidden;"></div>
        </div>
      </div>
    `;

    setupModals();
    setupScrollProgress();
  }

  /* ── Modal with body-scroll lock ── */
  function setupModals() {
    const viewResumeBtn     = document.getElementById("view-resume-btn");
    const resumeViewModal   = document.getElementById("resume-view-modal");
    const resumeViewClose   = document.getElementById("resume-view-close");
    const resumeViewDownload= document.getElementById("resume-view-download");
    const resumeDocContainer= document.getElementById("resume-doc-container");

    function openModal() {
      resumeViewModal.classList.add("open");
      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = getScrollbarWidth() + "px";
      // Load PDF iframe
      resumeDocContainer.innerHTML =
        `<iframe src="${heroData.resumeUrl}" width="100%" height="100%" style="border:none;display:block;"></iframe>`;
      resumeViewDownload.href = heroData.resumeUrl;
      resumeViewDownload.setAttribute("download", "Isha_Mhatre_Resume.pdf");
    }

    function closeModal() {
      resumeViewModal.classList.remove("open");
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      resumeDocContainer.innerHTML = "";
    }

    if (viewResumeBtn) viewResumeBtn.addEventListener("click", openModal);

    if (resumeViewClose) resumeViewClose.addEventListener("click", closeModal);

    // Click outside modal box to close
    if (resumeViewModal) {
      resumeViewModal.addEventListener("click", e => {
        if (e.target === resumeViewModal) closeModal();
      });
    }

    // Escape key closes modal
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && resumeViewModal.classList.contains("open")) closeModal();
    });
  }

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function setupScrollProgress() {
    const progress = document.getElementById("scroll-progress");
    if (!progress) return;
    window.addEventListener("scroll", () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (window.scrollY / docH) * 100 : 0) + "%";
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
