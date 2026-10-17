// Site metinleri — TR ve EN
export const t = {
  tr: {
    nav: {
      projects: 'Projeler',
      about: 'Hakkımda',
      contact: 'İletişim',
    },
    hero: {
      greeting: 'Merhaba, ben',
      roles: ['Robotik Geliştirici', 'Gömülü Sistemler', 'ROS 2 Geliştiricisi', 'Emülatör Meraklısı'],
      summary:
        'Robotik, gömülü sistemler ve simülasyon üzerine çalışıyorum.CHIP-8 emülatörü yazmaktan ROS 2 güdüm simülasyonlarına kadar, sistemlerin nasıl çalıştığını en alttan anlamayı seviyorum.',
      cta_projects: 'Projelerimi Gör',
      cta_contact: 'İletişime Geç',
      scroll: 'kaydır',
    },
    projects: {
      title: 'Öne Çıkan Projeler',
      subtitle: 'GitHub API üzerinden otomatik yıldız ve güncelleme bilgisi çeker.',
      all: 'Tüm Projeler',
      all_subtitle: 'Canlı olarak GitHub’ımdan listelenir.',
      view: 'GitHub’dan Gör',
      stars: 'yıldız',
      updated: 'Güncellendi',
      empty: 'Henüz proje yok.',
    },
    about: {
      title: 'Hakkımda',
      p1: 'Merhaba! Ben Erhan (fyigiter). Robotik, gömülü sistemler ve simülasyon alanlarında çalışıyorum. ROS 2, İHA kontrolü ve güdüm algoritmaları gibi konular ilgimi çekiyor.',
      p2: 'Boş zamanlarımda CHIP-8 emülatörü yazmak gibi nostaljik ama öğretici projeler yapıyorum. Amacım, hazır kütüphanelerin perde arkasında neler döndüğünü anlamak.',
      skills: 'Kullandığım Teknolojiler',
      github_stats: 'GitHub İstatistikleri',
      repos: 'Repo',
      followers: 'Takipçi',
      following: 'Takip',
    },
    contact: {
      title: 'İletişime Geç',
      subtitle: 'Proje, iş birliği veya sadece merhaba demek için.',
      github: 'GitHub',
      email: 'E-posta',
    },
    footer: {
      built: 'Astro ile inşa edildi',
      rights: 'Tüm hakları saklıdır.',
    },
    langBtn: 'EN',
    notFound: 'Aradığın sayfa bulunamadı.',
  },
  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hi, I am',
      roles: ['Robotics Developer', 'Embedded Systems', 'ROS 2 Developer', 'Emulator Enthusiast'],
      summary:
        'I work on robotics, embedded systems and simulation. From writing a CHIP-8 emulator to ROS 2 guidance simulations, I love understanding how systems work from the ground up.',
      cta_projects: 'See My Projects',
      cta_contact: 'Get In Touch',
      scroll: 'scroll',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Automatically pulls stars and update info from the GitHub API.',
      all: 'All Projects',
      all_subtitle: 'Listed live from my GitHub.',
      view: 'View on GitHub',
      stars: 'stars',
      updated: 'Updated',
      empty: 'No projects yet.',
    },
    about: {
      title: 'About Me',
      p1: "Hi! I'm Erhan (fyigiter). I work in robotics, embedded systems and simulation. Topics like ROS 2, UAV control and guidance algorithms grab my interest.",
      p2: 'In my free time I build nostalgic but educational projects like writing a CHIP-8 emulator. My goal is to understand what happens behind the curtain of ready-made libraries.',
      skills: 'Technologies I Use',
      github_stats: 'GitHub Stats',
      repos: 'Repos',
      followers: 'Followers',
      following: 'Following',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'For projects, collaboration, or just to say hi.',
      github: 'GitHub',
      email: 'Email',
    },
    footer: {
      built: 'Built with Astro',
      rights: 'All rights reserved.',
    },
    langBtn: 'TR',
    notFound: 'Page not found.',
  },
} as const;

export type Lang = keyof typeof t;
