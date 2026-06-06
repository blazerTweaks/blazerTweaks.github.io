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
  const main = document.querySelector("main");

  const sections = {
    home: main.innerHTML,
    // journal NÃO fica em cache — é sempre renderizado via fetch
    projects: document.getElementById("section-projects").innerHTML,
    about: document.getElementById("section-about").innerHTML,
  };

  // Template do journal (estrutura base, sem conteúdo dinâmico)
  const journalTemplate = document.getElementById("section-journal").innerHTML;

  const navMap = {
    Journal: "journal",
    Projects: "projects",
    About: "about",
  };

  let currentSection = "home";

  function navigateTo(section) {
    if (section === currentSection) return;
    currentSection = section;

    if (section === "journal") {
      main.innerHTML = journalTemplate;
      renderJournal(document.getElementById("journal-container"));
    } else {
      main.innerHTML = sections[section];
      if (section === "home") initHomeEffects();
    }

    if (section === "about") {
      renderAbout(document.getElementById("about-container"));
    }

    if (section === "projects") {
      renderProjects(document.getElementById("projects-container"));
    }

    document.querySelectorAll("nav h2").forEach((h2) => {
      h2.classList.toggle("nav-active", navMap[h2.textContent] === section);
    });

    updateBackBtn();
  }

  document.querySelectorAll("nav h2").forEach((h2) => {
    h2.addEventListener("click", () => {
      const target = navMap[h2.textContent];
      if (target) navigateTo(target);
    });
  });

  const backBtn = document.querySelector("nav img");

  function updateBackBtn() {
    backBtn.style.display = currentSection === "home" ? "none" : "block";
  }

  backBtn.style.display = "none";
  backBtn.addEventListener("click", () => navigateTo("home"));

  // ── EFEITOS DA HOME ───────────────────────────────────────────────────────
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
