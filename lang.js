// Dil geçişi (TR / EN / JA)
// [data-en] ve [data-ja] öznitelikli ögelerin metnini değiştirir.
// Özgün (TR) metin ilk çalıştırmada cache'lenir.
(function () {
  const html = document.documentElement;
  const SUPPORTED = ['tr', 'en', 'ja'];

  function currentLang() {
    const saved = localStorage.getItem('lang');
    return SUPPORTED.includes(saved) ? saved : 'tr';
  }

  function apply(lang) {
    html.lang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-en]').forEach((el) => {
      if (!el.dataset.trCache) el.dataset.trCache = el.textContent.trim();
      const translated = lang === 'tr' ? null : el.getAttribute('data-' + lang);
      el.textContent = translated ?? el.dataset.trCache;
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    window.dispatchEvent(new Event('langchange'));
  }

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => apply(btn.dataset.lang));
  });

  apply(currentLang());
})();
