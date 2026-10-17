# fyigiter.github.io — Portfolyo Sitesi

https://yigiterf.github.io adresine yayınlanacak kişisel portfolyo sitesi.
Astro + saf CSS/JS ile yazıldı; koyu "terminal" teması, TR/EN geçişi ve
canlı GitHub verisi içerir.

## Özellikler

- **Pastel zine estetiği** — fildişi kağıt zemin, kalın mürekkep kenarlıklar,
  sert gölgeler. İki font ailesi: `Space Grotesk` (metin) + `JetBrains Mono`
  (etiket/kod).
- **3B dönen kırmızı üçgen** — hem logo hem de hero'da büyük süs olarak
  dikey eksende (`rotateY`) kendi etrafında döner; arka yüz poligonuyla
  derinlik hissi verilir. `prefers-reduced-motion`'da durur.
- **Canlı çalışan konsol** — `help`, `whoami`, `ls`, `projects`, `skills`,
  `neofetch`, `uptime`… ArrowUp/Down ile komut geçmişi (`public/terminal.js`).
- **Proje kartları** — pastel plakalı, hafif eğik duran; hover'da düzelir.
  Sadece robotik / gömülü / DSP odaklı projeler listelenir; JS/web projeleri
  filtrelenir.
- **Kayan şerit** — ROS 2 ◆ İHA güdüm ◆ CHIP-8 … marquee animasyonu.
- **TR / EN geçişi** — sağ üstteki buton; tercih `localStorage`'da saklanır.
- **Canlı GitHub verisi** — künye kartındaki istatistikler ve "Son Repolar"
  bölümü GitHub API'den çalışma anında çekilir.

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
- [ ] İstersen terminalde `neofetch` çıktısını kendine göre zenginleştir.
