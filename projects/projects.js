// projects.js — renderiza projetos a partir do index.json manual

async function renderProjects(container) {
  container.innerHTML = `<div class="projects-loading">carregando...</div>`;

  let projects;
  try {
    const res = await fetch("projects/index.json");
    if (!res.ok) throw new Error("fetch error");
    projects = await res.json();
  } catch (e) {
    container.innerHTML = `<div class="projects-error">erro ao carregar projetos.</div>`;
    return;
  }

  if (!projects || projects.length === 0) {
    container.innerHTML = `<div class="projects-empty">nenhum projeto ainda.</div>`;
    return;
  }

  const statusClass = {
    "concluído":   "status-done",
    "em andamento": "status-wip",
    "pausado":     "status-paused",
    "abandonado":  "status-dropped",
  };

  const cards = projects
    .map((p) => {
      const cls = statusClass[p.status] || "status-default";
      const tags = (p.tags || [])
        .map((t) => `<span class="project-tag">${t}</span>`)
        .join("");

      return `
        <a
          class="project-card"
          href="${p.url || "#"}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="project-card-top">
            <h3 class="project-card-name">${p.name}</h3>
            ${p.status ? `<span class="project-status ${cls}">${p.status}</span>` : ""}
          </div>
          ${p.desc ? `<p class="project-card-desc">${p.desc}</p>` : ""}
          <div class="project-card-footer">
            ${
              p.lang
                ? (Array.isArray(p.lang) ? p.lang : [p.lang])
                    .map((l) => `<span class="project-card-lang">${l}</span>`)
                    .join("")
                : ""
            }
            ${tags ? `<div class="project-tags">${tags}</div>` : ""}
          </div>
        </a>
      `;
    })
    .join("");

  container.innerHTML = `<div class="projects-grid">${cards}</div>`;
}
