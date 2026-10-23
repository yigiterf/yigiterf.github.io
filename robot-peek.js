// Robot kolunun zamanlaması: arada bir kenardan belirir, bekler, çekilir.
// Tamamen dekoratif — prefers-reduced-motion açıkken hiç çalışmaz.
(function () {
  var el = document.querySelector('.robot-peek');
  if (!el) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  var side = 'left';
  var IN_MS = 3000; // ekranda kalma
  var OUT_MS = 1100; // çıkış animasyonu

  function rand(min, max) { return min + Math.random() * (max - min); }

  function peek() {
    if (document.hidden) { schedule(); return; }
    side = side === 'left' ? 'right' : 'left'; // sırayla sağ/sol
    el.classList.remove('from-left', 'from-right', 'is-out');
    el.classList.add(side === 'left' ? 'from-left' : 'from-right');
    el.style.setProperty('--peek-top', rand(26, 58).toFixed(1) + '%');
    // geçişin doğru başlangıç noktasından oynaması için sinrkon reflow
    void el.offsetWidth;
    el.classList.add('is-in');
    setTimeout(function () {
      el.classList.remove('is-in');
      el.classList.add('is-out');
      setTimeout(schedule, OUT_MS);
    }, IN_MS);
  }

  function schedule() {
    setTimeout(peek, rand(9000, 17000));
  }

  // ilk görünme: sayfa açıldıktan kısa süre sonra
  setTimeout(peek, rand(3200, 5200));
})();
