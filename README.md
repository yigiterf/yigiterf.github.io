# fyigiter.github.io — Portfolyo Sitesi

https://yigiterf.github.io adresine yayınlanacak kişisel portfolyo sitesi.
Astro + saf CSS/JS ile yazıldı; koyu "terminal" teması, TR/EN geçişi ve
canlı GitHub verisi içerir.

## Özellikler

- **Pastel zine estetiği** — fildişi kağıt zemin, kalın mürekkep kenarlıklar,
  sert gölgeler, Fraunces serif başlıklar + JetBrains Mono etiketler.
- **Dönen kırmızı ters üçgen** — hem logonun kendisi hem de hero'da büyük
  bir süs olarak yavaşça kendi ekseninde döner (`prefers-reduced-motion`'da durur).
- **Canlı çalışan konsol** — `help`, `whoami`, `ls`, `projects`, `skills`,
  `neofetch`, `uptime`, `sudo`… ArrowUp/Down ile komut geçmişi
  (`public/terminal.js`).
- **Proje figürleri** — `Fig. 01…` başlıklı, pastel plakalı kartlar; tech-stack
  etiketleri pill chip'ler. Kartlar hafif eğik durur, hover'da düzelir.
- **Kayan şerit** — ROS 2 ◆ İHA güdüm ◆ CHIP-8 … marquee animasyonu.
- **Logbook** — commit geçmişi estetiğinde, yıl italik serif başlıklı
  zaman çizelgesi.
- **TR / EN geçişi** — sağ üstteki buton; tercih `localStorage`'da saklanır.
- **Canlı GitHub verisi** — künye kartındaki istatistikler ve "canlı akış"
  figürleri GitHub API'den çalışma anında çekilir; yeni repo açtığında
  sitede otomatik belirir.

## Geliştirme

Node 22+ gerekir.

```bash
npm install
npm run dev      # http://localhost:4321
```

## Dağıtım (GitHub Pages)

1. GitHub'da **yigiterf.github.io** adında repo oluştur (yalnız **yigiterf**
   hesabının kullanıcı sitesi bu isimle çalışır).
2. Bu klasörü repoya push'la:

```bash
git init
git add -A
git commit -m "portfolyo: ilk sürüm"
git remote add origin git@github.com:yigiterf/yigiterf.github.io.git
git push -u origin main
```

3. Repo Ayarları → Pages → **Source: GitHub Actions**.
4. `deploy.yml` workflow'u her push'ta (ve "Run workflow" ile elle) derleyip yayınlar.

## Yeni proje eklemek / siteyi güncellemek

- **Öne çıkan bölüm:** `src/data/projects.ts` içine yeni obje ekle.
  TR + EN açıklama ve etiket girmeyi unutma.
- **Canlı bölüm:** hiçbir şey yapma — repoyu push'la, GitHub açıklamasını
  doldur, site kendiliğinden listeler.
- **Metinler:** `src/pages/index.astro` içinde TR metin + `data-en="..."`
  özniteliğindeki EN metni düzenle.
- **Renkler / tema:** `src/styles/global.css` içindeki `:root` değişkenleri.

## Yapılacaklar (senin doldurman gerekenler)

- [ ] İletişim bölümündeki `mailto:örnek@posta.com` adresini e-postanla değiştir.
- [ ] Zaman çizelgesi (`src/pages/index.astro` → `timeline`) girdilerini
      kendine göre zenginleştir.
- [ ] İstersen terminalde `neofetch` ASCII sanatını kendi logonla değiştir.
