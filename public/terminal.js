// Canlı mini terminal — basit komut parser'ı.
// Komutlar: help · whoami · ls · projects · skills · contact · github ·
//           uptime · neofetch · date · uname · echo … · clear · sudo
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
      ['dahili komutlar:', 'l-warn'],
      ['  help              bu liste', 'l-dim'],
      ['  whoami            kim benim', 'l-dim'],
      ['  ls                dizinleri listeler', 'l-dim'],
      ['  projects          öne çıkan modüller', 'l-dim'],
      ['  skills            teknoloji yığını', 'l-dim'],
      ['  contact           iletişim hatları', 'l-dim'],
      ['  github            profili açar', 'l-dim'],
      ['  uptime            GitHub mesajız ( gün)', 'l-dim'],
      ['  neofetch          sistem kartı', 'l-dim'],
      ['  uname             çekirdek bilgisi', 'l-dim'],
      ['  echo <msg>        ekrana yazar', 'l-dim'],
      ['  clear             ekranı temizler', 'l-dim'],
      ['  sudo rm -rf /     ...dene gör :)', 'l-dim'],
    ],
    whoami: [['yigiterf — robotik & gömülü sistemler geliştiricisi. C · Python · ROS 2', 'l-ok']],
    ls: [['projects/   skills/   contact/   forum/', 'l-dim'], ['(komutları deneyin: projects, skills, contact)', 'l-dim']],
    skills: [
      ['çekirdek:', 'l-warn'],
      ['  C, C++, Python — sıfırdan derleme sever', 'l-dim'],
      ['ağ & simülasyon:', 'l-warn'],
      ['  ROS 2, Gazebo, İHA güdüm (PN), PID', 'l-dim'],
      ['araçlar:', 'l-warn'],
      ['  Linux, Git, Make, CMake, Docker, JS (web yan işi)', 'l-dim'],
    ],
    projects: () => {
      const lines = [['ÖNE ÇIKAN MODÜLLER:', 'l-warn']];
      featured.forEach((name, i) => {
        lines.push([`  MOD-${String(i + 1).padStart(2, '0')}   ${name}`, 'l-dim']);
      });
      lines.push(['↓ kartları aşağıda görebilirsiniz — scroll', 'l-dim']);
      return lines;
    },
    contact: [
      ['github → https://github.com/yigiterf', 'l-ok'],
      ['mail   → örnek@posta.com  (aşağıda İletişim bölümü)', 'l-warn'],
    ],
    github: () => {
      window.open('https://github.com/yigiterf', '_blank', 'noopener');
      return [['yeni sekme açıldı: https://github.com/yigiterf', 'l-ok']];
    },
    uptime: () => [[`up ${UPTIME_DAYS} day, ${hh}:${mm} — 0 kernel panic`, 'l-ok']],
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
        'Shell:   bash — low-level mode',
        'Stack:   C · Python · ROS 2 · JS',
        'Topics:  PID · PN güdüm · CHIP-8',
      ];
      return info.map((line, i) => [i < art.length ? art[i] + '  ' + line : ''.padEnd(15) + line, 'banner']);
    },
    sudo: [['sudo:  burada izinler kısıtlı — nice try :)', 'l-err']],
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
      printOut([[`bash: ${name}: command not found — 'help' yazın`, 'l-err']]);
    }
  }

  // Boot (MOTD)
  printOut([
    ['[  ok  ] boot: low-level kernel derlendi', 'l-ok'],
    ['[  ok  ] mount: /dev/robotik — ROS 2 · İHA bağlandı', 'l-ok'],
    ['[  ok  ] ops: C, C++, Python yuklendi — -O3', 'l-ok'],
    [`[  ok  ] session: yigiterf@github.io — ${hh}:${mm}`, 'l-dim'],
    [`tip: 'help' yaz ve Enter'a bas — komutlar listelenir`, 'l-warn'],
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
