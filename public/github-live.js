// Canlı GitHub repo akışı — API'den repoları çeker, fork olmayan ve
// featured listesinde bulunmayanları "canlı akış" figürleri olarak basar.
// Yeni repo açtığında burada otomatik görünür.
(async function () {
  const grid = document.getElementById('live-grid');
  if (!grid) return;

  const LANG_COLORS = {
    C: '#8a827a', 'C++': '#e2503f', 'C#': '#5da271', Python: '#4f7ca8',
    JavaScript: '#d9b23c', TypeScript: '#4f7ca8', HTML: '#d97742',
    CSS: '#9b7fc4', CMake: '#c23d2e', Shell: '#5da271', Makefile: '#7a8b3c',
    Rust: '#b07219', Go: '#4f7ca8', Java: '#b07219', Lua: '#4f7ca8',
  };
  const featured = new Set((window.FEATURED_TITLES ?? []).map((t) => t.toLowerCase()));
  const lang = localStorage.getItem('lang') ?? 'tr';
  const OPEN_LABEL = { tr: 'aç ↗', en: 'open ↗', ja: '開く ↗' };

  // Web/JS projeleri bu portfolyoda listelenmez
  const EXCLUDED_LANGS = new Set(['JavaScript', 'TypeScript', 'HTML', 'CSS']);
  const EXCLUDED_REPOS = new Set(['flask-blog']);

  let repos = [];
  try {
    const res = await fetch('https://api.github.com/users/yigiterf/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(res.status);
    repos = await res.json();
  } catch {
    grid.closest('section').hidden = true;
    return;
  }

  const items = repos
    .filter((r) => !r.fork)
    .filter((r) => !featured.has(r.name.toLowerCase()))
    .filter((r) => !EXCLUDED_REPOS.has(r.name.toLowerCase()))
    .filter((r) => !EXCLUDED_LANGS.has(r.language))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 6);

  if (!items.length) { grid.closest('section').hidden = true; return; }
  grid.textContent = '';

  for (const r of items) {
    const fig = document.createElement('article');
    fig.className = 'fig';

    const plate = document.createElement('header');
    plate.className = 'fig-plate';
    const left = document.createElement('span');
    left.textContent = '◆ GitHub';
    const right = document.createElement('span');
    right.className = 'fig-lang';
    right.textContent = r.updated_at.slice(0, 7);
    plate.append(left, right);
    fig.appendChild(plate);

    const body = document.createElement('div');
    body.className = 'fig-body';

    const h3 = document.createElement('h3');
    h3.className = 'fig-title';
    const a = document.createElement('a');
    a.href = r.html_url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = r.name;
    h3.appendChild(a);
    body.appendChild(h3);

    const p = document.createElement('p');
    p.className = 'fig-desc';
    p.textContent = r.description ?? '—';
    body.appendChild(p);

    const tags = document.createElement('ul');
    tags.className = 'fig-tags';
    if (r.language) {
      const li = document.createElement('li');
      li.className = 'chip';
      const sq = document.createElement('span');
      sq.className = 'lang-sq';
      sq.style.background = LANG_COLORS[r.language] ?? '#8a827a';
      sq.style.marginRight = '6px';
      li.append(sq, r.language);
      tags.appendChild(li);
    }
    body.appendChild(tags);

    const foot = document.createElement('footer');
    foot.className = 'fig-foot';
    const link = document.createElement('a');
    link.className = 'fig-link';
    link.href = r.html_url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = OPEN_LABEL[lang] ?? OPEN_LABEL.tr;
    foot.appendChild(link);
    body.appendChild(foot);

    fig.appendChild(body);
    grid.appendChild(fig);
  }
})();
