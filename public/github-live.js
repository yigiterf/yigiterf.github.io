// Canlı GitHub repo akışı: API'den repoları çeker, fork olmayanları
// featured listesinde olmayanları "canlı akış" ızgarasına ekler.
// Yeni repo push'ladığında burada otomatik görünür.
(async function () {
  const grid = document.getElementById('live-grid');
  if (!grid) return;

  const LANG_COLORS = {
    C: '#555555', 'C++': '#f34b7d', 'C#': '#178600', Python: '#3572a5',
    JavaScript: '#f1e05a', TypeScript: '#2b7489', HTML: '#e34c26',
    CSS: '#563d7c', CMake: '#da3434', Shell: '#89e051', Makefile: '#427819',
    Rust: '#dea584', Go: '#00add8', Java: '#b07219', Lua: '#000080',
  };
  const featured = new Set((window.FEATURED_TITLES ?? []).map((t) => t.toLowerCase()));

  let repos = [];
  try {
    const res = await fetch('https://api.github.com/users/yigiterf/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(res.status);
    repos = await res.json();
  } catch {
    grid.closest('section').hidden = true; // API ulaşılamazsa bölümü gizle
    return;
  }

  const items = repos
    .filter((r) => !r.fork && !featured.has(r.name.toLowerCase()))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 9);

  if (!items.length) { grid.closest('section').hidden = true; return; }
  grid.textContent = ''; // "bağlanılıyor…" placeholder'ını temizle

  for (const r of items) {
    const card = document.createElement('article');
    card.className = 'card';

    const head = document.createElement('div');
    head.className = 'card-head';
    if (r.language) {
      const dot = document.createElement('span');
      dot.className = 'lang-dot';
      dot.style.background = LANG_COLORS[r.language] ?? '#999';
      dot.style.boxShadow = `0 0 8px ${LANG_COLORS[r.language] ?? '#999'}`;
      dot.title = r.language;
      head.appendChild(dot);
    }
    const h3 = document.createElement('h3');
    h3.textContent = r.name;
    head.appendChild(h3);
    card.appendChild(head);

    const p = document.createElement('p');
    p.className = 'card-desc';
    p.textContent = r.description ?? ''; // boşsa CSS min-height dengeler
    card.appendChild(p);

    const meta = document.createElement('div');
    meta.className = 'card-tags';
    const updateTag = document.createElement('span');
    updateTag.className = 'tag';
    updateTag.textContent = r.updated_at.slice(0, 7); // YYYY-MM
    meta.appendChild(updateTag);
    card.appendChild(meta);

    const a = document.createElement('a');
    a.className = 'card-link';
    a.href = r.html_url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'GitHub →';
    card.appendChild(a);

    grid.appendChild(card);
  }
})();
