(
  function () {
    function init() {
      const section = document.getElementById("education");
      if (!section || typeof educationData === "undefined") return;

      section.innerHTML = `
        <div class="section-wrap">
          <span class="section-label">My Academic Journey</span>
          <h2 class="section-heading">Education</h2>
          <div class="education-grid">
            ${educationData.map((edu, index) => `
              <div class="education-card" style="transition-delay: ${index * 0.12}s">
                <div class="edu-header">
                  <h3 class="edu-degree">${edu.degree}</h3>
                  <span class="edu-period">${edu.period}</span>
                </div>
                <p class="edu-institution">${edu.institution}</p>
                <span class="edu-detail">${edu.detail}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;

      setupReveal();
    }

    function setupReveal() {
      const cards = document.querySelectorAll(".education-card");
      if (!cards.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      cards.forEach(card => observer.observe(card));
    }

    document.addEventListener("DOMContentLoaded", init);
  }
)();
