(
  function () {
    function buildExpCard(e) {
      return `
        <div class="exp-card exp-reveal">
          <div class="exp-card-head">
            <div class="exp-card-left">
              <div class="exp-card-title">${e.title}</div>
              <div class="exp-card-org">${e.company}</div>
            </div>
            <div class="exp-card-right">
              <div class="exp-card-period">${e.duration}</div>
            </div>
          </div>
          <ul class="exp-card-desc">
            ${e.description.map(desc => `<li>${desc}</li>`).join("")}
          </ul>
        </div>`;
    }

    function buildEduCard(e) {
      return `
        <div class="exp-card exp-card--edu exp-reveal">
          <div class="exp-card-head">
            <div class="exp-card-left">
              <div class="exp-card-title">${e.degree}</div>
              <div class="exp-card-org">${e.institution}</div>
            </div>
            <div class="exp-card-right">
              <div class="exp-card-period">${e.duration}</div>
              ${e.grade ? `<div class="exp-card-grade">${e.grade}</div>` : ""}
            </div>
          </div>
        </div>`;
    }

    function setupReveal() {
      const els = document.querySelectorAll(".exp-reveal");
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      els.forEach(el => obs.observe(el));
    }

    function init() {
      const section = document.getElementById("experience");
      if (!section || typeof experienceData === "undefined") return;

      const { experience, education } = experienceData;

      section.innerHTML = `
        <div class="section-wrap">
          <span class="section-label">Background</span>
          <h2 class="section-heading">Experience & Education</h2>
          <div class="exp-layout">
            <div class="exp-main">
              ${experience.length ? `
                <div class="exp-group">
                  <div class="exp-group-label">
                    <span class="exp-group-dot"></span>Work Experience
                  </div>
                  ${experience.map(e => buildExpCard(e)).join("")}
                </div>
              ` : ""}

              ${education.length ? `
                <div class="exp-group">
                  <div class="exp-group-label">
                    <span class="exp-group-dot exp-group-dot--edu"></span>Education
                  </div>
                  ${education.map(e => buildEduCard(e)).join("")}
                </div>
              ` : ""}
            </div>
          </div>
        </div>`;

      setupReveal();
    }

    document.addEventListener("DOMContentLoaded", init);
  }
)();
