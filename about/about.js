async function renderAbout(container) {
  container.innerHTML = `<div class="journal-loading">carregando...</div>`;

  let data;
  try {
    const res = await fetch("about/about.json");
    data = await res.json();
  } catch (e) {
    container.innerHTML = `<div class="journal-empty">erro ao carregar.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="about-wrapper">

      <!-- topo: avatar grande + nome + bio -->
      <div class="about-top">
        <img src="${data.avatar}" alt="avatar" class="about-avatar" />
        <div class="about-top-text">
          <h2 class="about-nome">${data.nome}</h2>
          ${data.ocupacao ? `<p class="about-ocupacao">${data.ocupacao}</p>` : ""}
          <p class="about-bio">${data.bio}</p>
        </div>
      </div>

      <!-- corpo: duas colunas -->
      <div class="about-body">

        <!-- coluna esquerda -->
        <div class="about-col-left">

          ${
            data.informacoes
              ? `
            <div class="about-block">
              <span class="about-block-title">informações</span>
              <ul class="about-simple-list">
                ${data.informacoes.idade ? `<li>${data.informacoes.idade}</li>` : ""}
                ${data.informacoes.localizacao ? `<li>${data.informacoes.localizacao}</li>` : ""}
                ${data.informacoes.ocupacao ? `<li>${data.informacoes.ocupacao}</li>` : ""}
              </ul>
            </div>
          `
              : ""
          }

          ${
            data.atualmente
              ? `
            <div class="about-block">
              <span class="about-block-title">atualmente</span>
              <div class="about-now">
                ${
                  (() => {
                    const renderNowRows = (key, val) => {
                      if (!val) return '';
                      const items = Array.isArray(val) ? val : [val];
                      return items.map((item, i) => `
                        <div class="about-now-row">
                          <span class="about-now-key">${i === 0 ? key : ''}</span>
                          <span class="about-now-val">${item}</span>
                        </div>`).join('');
                    };
                    return [
                      renderNowRows('lendo', data.atualmente.lendo),
                      renderNowRows('assistindo', data.atualmente.assistindo),
                      renderNowRows('jogando', data.atualmente.jogando),
                    ].join('');
                  })()
                }
              </div>
            </div>
          `
              : ""
          }

        </div>

        <!-- coluna direita: favoritos em 3 subcolunas -->
        ${
          data.favoritos
            ? `
          <div class="about-col-right">
            <div class="about-block">
              <span class="about-block-title">favoritos</span>
              <div class="about-favs-grid">
                ${
                  data.favoritos.artistas && data.favoritos.artistas.length > 0
                    ? `
                  <div class="about-fav-col">
                    <span class="about-fav-label">artistas</span>
                    <ul class="about-fav-list">
                      ${data.favoritos.artistas.map((a) => `<li>${a}</li>`).join("")}
                    </ul>
                  </div>`
                    : ""
                }
                ${
                  data.favoritos.jogos && data.favoritos.jogos.length > 0
                    ? `
                  <div class="about-fav-col">
                    <span class="about-fav-label">jogos</span>
                    <ul class="about-fav-list">
                      ${data.favoritos.jogos.map((j) => `<li>${j}</li>`).join("")}
                    </ul>
                  </div>`
                    : ""
                }
                ${
                  data.favoritos.animes && data.favoritos.animes.length > 0
                    ? `
                  <div class="about-fav-col">
                    <span class="about-fav-label">animes</span>
                    <ul class="about-fav-list">
                      ${data.favoritos.animes.map((a) => `<li>${a}</li>`).join("")}
                    </ul>
                  </div>`
                    : ""
                }
              </div>
            </div>
          </div>
        `
            : ""
        }

      </div>
    </div>
  `;
}
