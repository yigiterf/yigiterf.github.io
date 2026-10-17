// Dil geçişi: [data-en] ögelerinin metnini değiştirir, html lang günceller.
(function () {
  const btn = document.getElementById('lang-toggle');
  const html = document.documentElement;

  function apply(lang) {
    html.lang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-en]').forEach((el) => {
      const tr = el.getAttribute('data-tr') ?? el.dataset.trCache ?? el.textContent.trim();
      if (!el.dataset.trCache) el.dataset.trCache = tr;
      el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.dataset.trCache;
    });

    if (btn) btn.textContent = lang === 'en' ? 'TR' : 'EN';
    window.dispatchEvent(new Event('langchange'));
  }

  apply(localStorage.getItem('lang') ?? 'tr');

  btn?.addEventListener('click', () => {
    apply(html.lang === 'tr' ? 'en' : 'tr');
  });
})();
