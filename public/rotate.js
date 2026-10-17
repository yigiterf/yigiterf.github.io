// Otomatik döndürülen yazı animasyonu
// Bekleme yapmadan yazıp siler — [data-rotate] ögesinde duran metinleri sırayla gösterir.
(function () {
  const el = document.querySelector('[data-rotate]');
  if (!el) return;

  const tr = JSON.parse(el.getAttribute('data-tr-words') ?? '[]');
  const en = JSON.parse(el.getAttribute('data-en-words') ?? '[]');

  let timer;
  let lang = localStorage.getItem('lang') ?? 'tr';
  let list = lang === 'en' ? en : tr.length ? tr : en;
  let i = 0;
  let deleting = false;
  let text = '';

  function tick() {
    const word = list[i % list.length];
    if (deleting) {
      text = word.slice(0, text.length - 1);
    } else {
      text = word.slice(0, text.length + 1);
    }
    el.textContent = text;

    let delay = deleting ? 40 : 100;
    if (!deleting && text === word) {
      delay = 1600;
      deleting = true;
    } else if (deleting && text === '') {
      deleting = false;
      i++;
      delay = 300;
    }

    timer = setTimeout(tick, delay);
  }

  window.addEventListener('langchange', () => {
    clearTimeout(timer);
    lang = localStorage.getItem('lang') ?? 'tr';
    list = lang === 'en' ? en.slice() : (tr.length ? tr.slice() : en.slice());
    i = 0;
    deleting = false;
    text = '';
    timer = setTimeout(tick, 50);
  });

  tick();
})();
