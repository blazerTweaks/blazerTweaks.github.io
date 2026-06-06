// journal.js — renderiza o journal buscando posts via fetch

async function renderJournal(container) {
  container.innerHTML = `<div class="journal-loading">carregando...</div>`;

  let posts;
  try {
    const res = await fetch("journal/index.json");
    posts = await res.json();
  } catch (e) {
    container.innerHTML = `<div class="journal-empty">erro ao carregar o journal.</div>`;
    return;
  }

  if (!posts || posts.length === 0) {
    container.innerHTML = `<div class="journal-empty">nenhuma entrada ainda.</div>`;
    return;
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const months = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  }

  function renderList() {
    container.innerHTML = `
      <div class="journal-list">
        ${posts
          .map(
            (post) => `
          <article class="journal-entry" data-id="${post.id}">
            <span class="journal-date">${formatDate(post.date)}</span>
            <div class="journal-entry-text">
              <h3 class="journal-title">${post.title}</h3>
              ${post.subtitle ? `<p class="journal-subtitle">${post.subtitle}</p>` : ""}
              ${
                post.tags && post.tags.length > 0
                  ? `<div class="journal-tags">${post.tags.map((t) => `<span class="journal-tag">${t}</span>`).join("")}</div>`
                  : ""
              }
            </div>
          </article>
        `,
          )
          .join("")}
      </div>
    `;

    container.querySelectorAll(".journal-entry").forEach((el) => {
      el.addEventListener("click", () => {
        const post = posts.find((p) => p.id === el.dataset.id);
        if (post) renderPost(post);
      });
    });
  }

  async function renderPost(post) {
    container.innerHTML = `<div class="journal-loading">carregando...</div>`;

    let markdown;
    try {
      const res = await fetch(`journal/posts/${post.id}.md`);
      markdown = await res.text();
    } catch (e) {
      container.innerHTML = `<div class="journal-empty">erro ao carregar a nota.</div>`;
      return;
    }

    marked.use({
      renderer: {
        code(arg) {
          const text = typeof arg === "object" ? arg.text : arg;
          const lang = typeof arg === "object" ? arg.lang : "";
          const validLang = lang && hljs.getLanguage(lang) ? lang : "plaintext";
          const highlighted = hljs.highlight(text || "", {
            language: validLang,
          }).value;
          return `<pre><code class="hljs language-${validLang}">${highlighted}</code></pre>`;
        },
      },
    });

    const html = marked.parse(markdown);

    container.innerHTML = `
      <div class="journal-post">
        <button class="journal-back">← voltar</button>
        <div class="journal-post-header">
          <span class="journal-date">${formatDate(post.date)}</span>
          ${post.editado ? `<span class="journal-edited">editado em ${formatDate(post.editado)}</span>` : ""}
          <h2 class="journal-post-title">${post.title}</h2>
          ${post.subtitle ? `<p class="journal-post-subtitle">${post.subtitle}</p>` : ""}
          ${
            post.tags && post.tags.length > 0
              ? `<div class="journal-tags">${post.tags.map((t) => `<span class="journal-tag">${t}</span>`).join("")}</div>`
              : ""
          }
        </div>
        <div class="journal-content markdown-body">${html}</div>
      </div>
    `;

    container
      .querySelector(".journal-back")
      .addEventListener("click", renderList);
  }

  renderList();
}
