// GitHub API'den canlı istatistik çeker — statik site + canlı veri.
(async function () {
  const res = await fetch('https://api.github.com/users/yigiterf');
  if (!res.ok) return;
  const { public_repos, followers, following, avatar_url, name, bio, location } = await res.json();
  document.getElementById('stat-repos').textContent = public_repos ?? '—';
  document.getElementById('stat-followers').textContent = followers ?? '—';
  document.getElementById('stat-following').textContent = following ?? '—';
})();
