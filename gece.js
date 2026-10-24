// Gece / gündüz modu düğmesi (header).
// Başlangıç değeri Layout'taki is:inline betikle boya öncesi belirlendi
// (FOUC yok); burada yalnızca düğme mantığı ve kalıcılık var.
(function () {
  var btn = document.getElementById('tema-btn');
  var root = document.documentElement;
  if (!btn) return;

  function uygula(t, kalici) {
    if (kalici) { try { localStorage.setItem('tema', t); } catch (e) {} }
    root.dataset.tema = t;
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === 'dark' ? '#201b15' : '#f7f2e9';
  }

  btn.addEventListener('click', function () {
    uygula(root.dataset.tema === 'dark' ? 'light' : 'dark', true);
  });

  // kullanıcı henüz seçim yapmadıysa sistem tercihini dinlemeye devam et
  try {
    if (!localStorage.getItem('tema') && window.matchMedia('(prefers-color-scheme: dark)').addEventListener) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        uygula(e.matches ? 'dark' : 'light', false);
      });
    }
  } catch (e) {}
})();
