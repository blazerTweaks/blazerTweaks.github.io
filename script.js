// script.js
document.addEventListener("DOMContentLoaded", function () {
  // ── LETTER HOVER NO USERNAME ──────────────────────────────────────────────
  document.querySelectorAll(".username-text").forEach((el) => {
    const text = el.textContent;
    el.innerHTML = "";
    for (const char of text) {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.display = "inline-block";
      span.style.transition =
        "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)";
      span.addEventListener("mouseenter", () => {
        span.style.transform = "scale(1.15)";
      });
      span.addEventListener("mouseleave", () => {
        span.style.transform = "scale(1)";
      });
      el.appendChild(span);
    }
  });

  // ── HOVER NO AVATAR ───────────────────────────────────────────────────────
  const avatar = document.querySelector(".avatar");
  if (avatar) {
    avatar.style.transition =
      "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)";
    avatar.addEventListener("mouseenter", () => {
      avatar.style.transform = "scale(1.05)";
    });
    avatar.addEventListener("mouseleave", () => {
      avatar.style.transform = "scale(1)";
    });
  }

  // ── HOVER NOS ÍCONES ──────────────────────────────────────────────────────
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.style.transition =
      "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)";
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.1)";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1)";
    });
  });

  // ── TOUCH FEEDBACK ────────────────────────────────────────────────────────
  document.querySelectorAll(".social-icon, .avatar").forEach((el) => {
    el.addEventListener("touchstart", () => {
      el.style.transform = "scale(0.95)";
    });
    el.addEventListener("touchend", () => {
      el.style.transform = "scale(1)";
    });
  });

  // ── TÍTULO ANIMADO ────────────────────────────────────────────────────────
  const originalTitle = "interlude";
  let index = 1;
  let isDeleting = false;
  const speed = 700;
  const pauseAtEnd = 1200;
  const pauseAtStart = 800;

  function animateTitle() {
    if (isDeleting) {
      document.title = originalTitle.slice(0, index);
      index--;
      if (index < 1) {
        index = 1;
        isDeleting = false;
        setTimeout(animateTitle, pauseAtStart);
        return;
      }
    } else {
      document.title = originalTitle.slice(0, index);
      index++;
      if (index > originalTitle.length) {
        isDeleting = true;
        setTimeout(animateTitle, pauseAtEnd);
        return;
      }
    }
    setTimeout(animateTitle, speed);
  }
  animateTitle();

  // ── NAVEGAÇÃO COM TRANSIÇÃO ───────────────────────────────────────────────

  // Conteúdo de cada seção (edite à vontade)
  const main = document.querySelector("main");

  const sections = {
    home: main.innerHTML,
    journal: document.getElementById("section-journal").innerHTML,
    projects: document.getElementById("section-projects").innerHTML,
    about: document.getElementById("section-about").innerHTML,
  };
  // Mapa: texto do nav → chave em sections
  const navMap = {
    Journal: "journal",
    Projects: "projects",
    About: "about",
  };

  let currentSection = "home";

  function navigateTo(section) {
    if (section === currentSection) return;
    currentSection = section;

    main.innerHTML = sections[section];

    // Re-inicializa efeitos se voltou pra home
    if (section === "home") initHomeEffects();

    // Atualiza nav ativo
    document.querySelectorAll("nav h2").forEach((h2) => {
      h2.classList.toggle("nav-active", navMap[h2.textContent] === section);
    });

    updateBackBtn();
  }

  // Cliques no nav
  document.querySelectorAll("nav h2").forEach((h2) => {
    h2.addEventListener("click", () => {
      const target = navMap[h2.textContent];
      if (target) navigateTo(target);
    });
  });

  // Botão de voltar
  const backBtn = document.querySelector("nav img");

  function updateBackBtn() {
    backBtn.style.display = currentSection === "home" ? "none" : "block";
  }

  backBtn.style.display = "none"; // esconde no início
  backBtn.addEventListener("click", () => navigateTo("home"));

  // Efeitos da home (re-aplica após navegação)
  function initHomeEffects() {
    document.querySelectorAll(".username-text").forEach((el) => {
      const text = el.textContent;
      el.innerHTML = "";
      for (const char of text) {
        const span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char;
        span.style.display = "inline-block";
        span.style.transition =
          "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)";
        span.addEventListener("mouseenter", () => {
          span.style.transform = "scale(1.15)";
        });
        span.addEventListener("mouseleave", () => {
          span.style.transform = "scale(1)";
        });
        el.appendChild(span);
      }
    });

    const av = document.querySelector(".avatar");
    if (av) {
      av.style.transition =
        "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)";
      av.addEventListener("mouseenter", () => {
        av.style.transform = "scale(1.05)";
      });
      av.addEventListener("mouseleave", () => {
        av.style.transform = "scale(1)";
      });
    }

    document.querySelectorAll(".social-icon").forEach((icon) => {
      icon.style.transition =
        "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)";
      icon.addEventListener("mouseenter", () => {
        icon.style.transform = "scale(1.1)";
      });
      icon.addEventListener("mouseleave", () => {
        icon.style.transform = "scale(1)";
      });
    });

    document.querySelectorAll(".social-icon, .avatar").forEach((el) => {
      el.addEventListener("touchstart", () => {
        el.style.transform = "scale(0.95)";
      });
      el.addEventListener("touchend", () => {
        el.style.transform = "scale(1)";
      });
    });
  }
});
