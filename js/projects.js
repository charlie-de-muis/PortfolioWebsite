let allProjects = [];
let currentFilter = 'all';

async function loadProjects() {
  const response = await fetch('../data/projects.json');
  allProjects = await response.json();

  const params = new URLSearchParams(window.location.search);
  currentFilter = params.get('filter') || 'all';

  const savedLang = localStorage.getItem('preferredLang') || 'nl';
  renderProjects(currentFilter, savedLang);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = localStorage.getItem('preferredLang') || 'nl';
      renderProjects(currentFilter, lang);
    });
  });
}

function renderProjects(filter, lang) {
  const grid = document.getElementById('project-grid');
  const filtered = filter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => {
    const hasLink = Boolean(p.link);
    const tag = hasLink ? 'a' : 'div';
    const linkAttrs = hasLink ? `href="${p.link}" target="_blank" rel="noopener"` : '';

    return `
      <${tag} ${linkAttrs} class="card${hasLink ? '' : ' card--no-link'}">
        <img src="${p.image}" alt="${p['title_' + lang]}">
        <h3>${p['title_' + lang]}</h3>
        <p>${p['description_' + lang]}</p>
      </${tag}>
    `;
  }).join('');
}

document.addEventListener('languagechange', (e) => {
  renderProjects(currentFilter, e.detail.lang);
});

loadProjects();