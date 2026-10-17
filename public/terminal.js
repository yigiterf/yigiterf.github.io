// Canlı mini terminal — basit komut parser'ı.
// Komutlar: help · whoami · ls · projects · skills · contact · github ·
//           uptime · neofetch · date · uname · echo … · clear
(function () {
  const input = document.getElementById('term-in');
  const out = document.getElementById('term-out');
  const body = document.getElementById('term-body');
  if (!input || !out || !body) return;

  const featured = (window.FEATURED_TITLES ?? []);
  const UPTIME_DAYS = Math.floor((Date.now() - new Date('2019-03-23').getTime()) / 864e5);
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');

  const CMDS = {
    help: [
      ['kullanılabilir komutlar:', 'l-warn'],
      ['  help              bu listeyi gösterir', 'l-dim'],
      ['  whoami            kısa tanıtım', 'l-dim'],
      ['  ls                dizinleri listeler', 'l-dim'],
      ['  projects          öne çıkan projeler', 'l-dim'],
      ['  skills            kullandığım teknolojiler', 'l-dim'],
      ['  contact           iletişim bilgileri', 'l-dim'],
      ['  github            GitHub profilimi açar', 'l-dim'],
      ['  uptime            GitHub geçmişim', 'l-dim'],
      ['  neofetch          sistem kartı', 'l-dim'],
      ['  uname             çekirdek bilgisi', 'l-dim'],
      ['  echo <metin>      ekrana yazar', 'l-dim'],
      ['  clear             ekranı temizler', 'l-dim'],
    ],
    whoami: [['yigiterf — robotik ve gömülü sistemler geliştiricisi. C · Python · ROS 2', 'l-ok']],
    ls: [['projects/   skills/   contact/', 'l-dim'], ['(deneyin: projects, skills, contact)', 'l-dim']],
    skills: [
      ['diller:', 'l-warn'],
      ['  C, C++, Python', 'l-dim'],
      ['robotik:', 'l-warn'],
      ['  ROS 2, Gazebo, İHA güdüm (PN), PID kontrol', 'l-dim'],
      ['araçlar:', 'l-warn'],
      ['  Linux, Git, Make, CMake', 'l-dim'],
    ],
    projects: () => {
      const lines = [['öne çıkan projeler:', 'l-warn']];
      featured.forEach((name, i) => {
        lines.push([`  ${String(i + 1).padStart(2, '0')}  ${name}`, 'l-dim']);
      });
      lines.push(['kartlarını yukarıdaki Projeler bölümünde görebilirsiniz', 'l-dim']);
      return lines;
    },
    contact: [
      ['github → https://github.com/yigiterf', 'l-ok'],
      ['mail   → örnek@posta.com (aşağıdaki İletişim bölümü)', 'l-warn'],
    ],
    github: () => {
      window.open('https://github.com/yigiterf', '_blank', 'noopener');
      return [['yeni sekmede açılıyor: https://github.com/yigiterf', 'l-ok']];
    },
    uptime: () => [[`GitHub'a katılalı ${UPTIME_DAYS} gün oldu — hâlâ derliyor`, 'l-ok']],
    date: [[new Date().toString(), 'l-dim']],
    uname: [['LowLevelOS 6.9-generic #1 SMP PREEMPT_DYNAMIC x86_64', 'l-ok']],
    neofetch: () => {
      const art = [
        '┌───────────┐',
        '│   ▸ _     │',
        '│           │',
        '├───────────┤',
        '└──┬───┬──┬─┘',
      ];
      const info = [
        'yigiterf@github.io',
        '┈'.repeat(23),
        'OS:      LowLevelOS 6.9 (arch btw)',
        'Kernel:  robotik-kernel-6.9',
        'Uptime:  ' + UPTIME_DAYS + ' days',
        'Shell:   bash',
        'Stack:   C · Python · ROS 2',
        'Topics:  PID · PN güdüm · CHIP-8 · DSP',
      ];
      return info.map((line, i) => [i < art.length ? art[i] + '  ' + line : ''.padEnd(15) + line, 'banner']);
    },
  };
  CMDS.stack = CMDS.skills;

  const HIST = [];
  let histIdx = -1;

  function printOut(lines) {
    (lines ?? []).forEach(([t, c]) => {
      const div = document.createElement('div');
      if (c) div.className = c;
      div.textContent = t;
      out.appendChild(div);
    });
  }

  function run(raw) {
    const cmd = raw.trim();
    const echoLine = document.createElement('div');
    echoLine.innerHTML =
      `<span class="term-prompt">➜ ~$</span> ` +
      cmd.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    out.appendChild(echoLine);

    if (!cmd) return;
    if (HIST[0] !== cmd) HIST.unshift(cmd);
    histIdx = -1;

    const [name, ...args] = cmd.split(/\s+/);

    if (name === 'echo') {
      printOut([[args.join(' '), 'l-dim']]);
    } else if (name === 'clear') {
      out.textContent = '';
    } else if (CMDS[name]) {
      const res = CMDS[name];
      printOut(typeof res === 'function' ? res() : res);
    } else {
      printOut([[`bash: ${name}: komut bulunamadı — 'help' yazın`, 'l-err']]);
    }
  }

  // Açılış mesajları
  printOut([
    ['[  ok  ] sistem başlatıldı — pastel build', 'l-ok'],
    ['[  ok  ] ROS 2 ve İHA modülleri yüklendi', 'l-ok'],
    ['[  ok  ] derleyiciler hazır: C · C++ · Python', 'l-ok'],
    [`[  ok  ] oturum: yigiterf@github.io — ${hh}:${mm}`, 'l-dim'],
    ["kullanılabilir komutlar için 'help' yazıp Enter'a basın", 'l-warn'],
  ]);

  body.addEventListener('click', () => input.focus());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      run(input.value);
      input.value = '';
      body.scrollTop = body.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      if (histIdx < HIST.length - 1) { histIdx++; input.value = HIST[histIdx]; }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (histIdx > 0) { histIdx--; input.value = HIST[histIdx]; }
      else { histIdx = -1; input.value = ''; }
      e.preventDefault();
    }
  });
})();
