// ÖNE ÇIKAN PROJELER — burayı elle düzenlersin.
// Yeni proje eklemek için bu listeye yeni bir obje ekle; site her iki dilde de gösterir.
// Diğer tüm repolar ise "Tüm Projeler" bölümünde GitHub API'den otomatik listelenir.
export type Project = {
  title: string;
  url: string;
  language: string; // GitHub dil adı — renk noktası için (bkz. LANG_COLORS)
  date: string; // YYYY-MM-DD
  tags: { tr: string[]; en: string[] };
  desc: { tr: string; en: string };
};

export const featured: Project[] = [
  {
    title: 'chip-emulator',
    url: 'https://github.com/yigiterf/chip-emulator',
    language: 'C',
    date: '2026-10-16',
    tags: {
      tr: ['Emülatör', 'C', 'Bilgisayar Mimarisi'],
      en: ['Emulator', 'C', 'Computer Architecture'],
    },
    desc: {
      tr: 'Hazır çerçeve kullanmadan sıfırdan yazılan CHIP-8 emülatörü: bellek, opcode tablosu ve fetch-decode-execute döngüsü. Aynı zamanda C ve mimari üzerine yazılmış bir not defteri.',
      en: 'A CHIP-8 emulator written from scratch — memory, opcode table and the fetch-decode-execute loop. Doubles as a notebook on C and computer architecture.',
    },
  },
  {
    title: 'ros2-pn-guidance-sim',
    url: 'https://github.com/yigiterf/ros2-pn-guidance-sim',
    language: 'Python',
    date: '2026-08-16',
    tags: {
      tr: ['ROS 2', 'Güdüm', 'Simülasyon'],
      en: ['ROS 2', 'Guidance', 'Simulation'],
    },
    desc: {
      tr: 'Oransal Navigasyon (PN) güdüm kanununun ROS 2 üzerinde simülasyonu.',
      en: 'Simulation of the Proportional Navigation (PN) guidance law on ROS 2.',
    },
  },
  {
    title: 'patrol-drone',
    url: 'https://github.com/yigiterf/patrol-drone',
    language: 'C',
    date: '2026-08-18',
    tags: {
      tr: ['İHA', 'Gömülü C', 'Güvenlik'],
      en: ['UAV', 'Embedded C', 'Security'],
    },
    desc: {
      tr: 'Sınır devriyesi uçan, tehdit algıladığında hedefe kilitlenen drone.',
      en: 'A border-patrol drone that locks onto a target when it detects a threat.',
    },
  },
  {
    title: 'drone-precision-landing',
    url: 'https://github.com/yigiterf/drone-precision-landing',
    language: 'Python',
    date: '2026-08-18',
    tags: {
      tr: ['İHA', 'Python', 'Kontrol'],
      en: ['UAV', 'Python', 'Control'],
    },
    desc: {
      tr: 'İHA’lar için hassas iniş algoritmaları.',
      en: 'Precision landing algorithms for UAVs, written in Python.',
    },
  },
  {
    title: 'cafe_robot_simulation',
    url: 'https://github.com/yigiterf/cafe_robot_simulation',
    language: 'CMake',
    date: '2026-07-20',
    tags: {
      tr: ['ROS', 'Gazebo', 'Servis Robotu'],
      en: ['ROS', 'Gazebo', 'Service Robot'],
    },
    desc: {
      tr: 'Kafe ortamında servis robotu simülasyonu.',
      en: 'A ROS-based café service robot simulation.',
    },
  },
  {
    title: 'audio-signal-processing',
    url: 'https://github.com/yigiterf/audio-signal-processing',
    language: 'Python',
    date: '2026-10-17',
    tags: {
      tr: ['DSP', 'Ses', 'Python'],
      en: ['DSP', 'Audio', 'Python'],
    },
    desc: {
      tr: 'Python ile ses sinyali işleme deneyleri.',
      en: 'Audio signal processing experiments in Python.',
    },
  },
  {
    title: 'StudyCount',
    url: 'https://github.com/yigiterf/StudyCount',
    language: 'JavaScript',
    date: '2024-04-20',
    tags: {
      tr: ['Web', 'JS', 'Verimlilik'],
      en: ['Web', 'JS', 'Productivity'],
    },
    desc: {
      tr: 'Ders çalışma takip web uygulaması — canlı: study-count.vercel.app',
      en: 'A study-tracking web app — live at study-count.vercel.app.',
    },
  },
  {
    title: 'Javascript-Turkce',
    url: 'https://github.com/yigiterf/Javascript-Turkce',
    language: 'JavaScript',
    date: '2024-05-18',
    tags: {
      tr: ['JS', 'Notlar', 'Öğrenme'],
      en: ['JS', 'Notes', 'Learning'],
    },
    desc: {
      tr: 'Farklı kaynaklardan JavaScript öğrenirken tuttuğum Türkçe notlar.',
      en: 'My Turkish-language notes taken while learning JavaScript.',
    },
  },
];
