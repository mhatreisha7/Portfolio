/* ── Theme Toggle & Smooth Scroll ── */
(function () {
  const STORAGE_KEY = "portfolio-theme";

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return "dark"; // default
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // ── Ultra-smooth scroll with momentum ──
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        smoothScrollTo(target);
      });
    });
  }

  function smoothScrollTo(target) {
    const navHeight = 80;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(600, Math.max(200, Math.abs(distance) * 0.25));
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * easedProgress);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function init() {
    applyTheme(getPreferred());

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light");
        applyTheme(isLight ? "dark" : "light");
      });
    }

    setupSmoothScroll();
    initTechBgAnimations();
  }

  // ── Background Design Elements (Feminine-Minimal) ──
  function initTechBgAnimations() {
    const CONFIG = {
      opacityMin:      0.35,
      opacityMax:      0.65,
      spawnInterval:   3000,
      initialBatch:    4,
      visibleDuration: 2500,
      fadeTransition:  "0.5s ease",
    };

    // Feminine-minimal design snippets instead of terminal commands
    const DESIGN_ELEMENTS = [
      "✨ Design",
      "◆ Elegant",
      "∞ Infinite",
      "◇ Minimal",
      "✓ Clean",
      "◈ Refined",
      "⟡ Modern",
      "◆ Smooth",
      "✧ Soft",
      "◇ Grace",
    ];

    const container = document.createElement("div");
    container.className = "tech-bg-animations";
    container.setAttribute("aria-hidden", "true");

    function createSnippet() {
      if (document.hidden) return;

      const snippet = document.createElement("div");
      snippet.className = "tech-bg-element";
      snippet.textContent = DESIGN_ELEMENTS[Math.floor(Math.random() * DESIGN_ELEMENTS.length)];
      snippet.style.transition = `opacity ${CONFIG.fadeTransition}, transform ${CONFIG.fadeTransition}`;

      const side = Math.random() > 0.5 ? "left" : "right";
      const x = side === "left" ? (Math.random() * 12) : (88 + Math.random() * 12);
      const y = Math.random() * 90 + 5;

      snippet.style.left = `${x}%`;
      snippet.style.top  = `${y}%`;
      snippet.style.opacity = "0";
      snippet.style.transform = `translateY(${Math.random() * 20 - 10}px)`;
      container.appendChild(snippet);

      setTimeout(() => {
        snippet.style.opacity = (CONFIG.opacityMin + Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin)).toString();
        snippet.style.transform = "translateY(0)";

        setTimeout(() => {
          snippet.style.opacity = "0";
          snippet.style.transform = `translateY(${Math.random() * -20}px)`;
          setTimeout(() => snippet.remove(), 1000);
        }, CONFIG.visibleDuration);
      }, 100);
    }

    setTimeout(() => {
      const heroSection = document.getElementById("hero");
      if (!heroSection) return;
      heroSection.appendChild(container);

      setInterval(createSnippet, CONFIG.spawnInterval);
      for (let i = 0; i < CONFIG.initialBatch; i++) {
        setTimeout(createSnippet, i * 400);
      }
    }, 0);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
