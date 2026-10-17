// ÖNE ÇIKAN PROJELER — burayı elle düzenlersin.
// Yeni proje eklemek için bu listeye yeni bir obje ekle; site üç dilde de gösterir.
// Diğer tüm repolar ise "Son Repolar" bölümünde GitHub API'den otomatik listelenir.
export type Project = {
  title: string;
  url: string;
  language: string; // GitHub dil adı — renk noktası için (bkz. LANG_COLORS)
  date: string; // YYYY-MM-DD
  tags: { tr: string[]; en: string[]; ja: string[] };
  desc: { tr: string; en: string; ja: string };
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
      ja: ['エミュレータ', 'C', 'コンピュータアーキテクチャ'],
    },
    desc: {
      tr: 'Hazır çerçeve kullanmadan sıfırdan yazılan CHIP-8 emülatörü: bellek, opcode tablosu ve fetch-decode-execute döngüsü. Aynı zamanda C ve mimari üzerine yazılmış bir not defteri.',
      en: 'A CHIP-8 emulator written from scratch — memory, opcode table and the fetch-decode-execute loop. Doubles as a notebook on C and computer architecture.',
      ja: 'フレームワークを使わず一から書き上げた CHIP-8 エミュレータ。メモリ、オペコード表、fetch-decode-execute ループを実装し、C 言語とコンピュータアーキテクチャの学習ノートも兼ねています。',
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
      ja: ['ROS 2', '誘導', 'シミュレーション'],
    },
    desc: {
      tr: 'Oransal Navigasyon (PN) güdüm kanununun ROS 2 üzerinde simülasyonu.',
      en: 'Simulation of the Proportional Navigation (PN) guidance law on ROS 2.',
      ja: '比例航法（PN）誘導則の ROS 2 上でのシミュレーション。',
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
      ja: ['UAV', '組み込み C', 'セキュリティ'],
    },
    desc: {
      tr: 'Sınır devriyesi uçan, tehdit algıladığında hedefe kilitlenen drone.',
      en: 'A border-patrol drone that locks onto a target when it detects a threat.',
      ja: '国境を巡回するドローン。脅威を検知すると目標にロックオンします。',
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
      ja: ['UAV', 'Python', '制御'],
    },
    desc: {
      tr: 'İHA’lar için hassas iniş algoritmaları.',
      en: 'Precision landing algorithms for UAVs, written in Python.',
      ja: 'UAV のための高精度着陸アルゴリズム。',
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
      ja: ['ROS', 'Gazebo', 'サービスロボット'],
    },
    desc: {
      tr: 'Kafe ortamında servis robotu simülasyonu.',
      en: 'A ROS-based café service robot simulation.',
      ja: 'カフェ環境におけるサービスロボットのシミュレーション。',
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
      ja: ['DSP', '音声', 'Python'],
    },
    desc: {
      tr: 'Python ile ses sinyali işleme deneyleri.',
      en: 'Audio signal processing experiments in Python.',
      ja: 'Python による音声信号処理の実験。',
    },
  },
];
