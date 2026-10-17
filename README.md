# fyigiter.github.io — Portfolyo Sitesi

https://yigiterf.github.io adresine yayınlanacak kişisel portfolyo sitesi.
Astro + saf CSS/JS ile yazıldı; koyu "terminal" teması, TR/EN geçişi ve
canlı GitHub verisi içerir.

## Özellikler

- **Bento-grid düzen** — asimetrik hücreler: kimlik + canlı terminal + GitHub
  istatistikleri + durum kartı. Köşelerde teknik `+` işaretleri.
- **Canlı çalışan terminal** — sağ üstte komut parse eden mini bash:
  `help`, `whoami`, `ls`, `projects`, `skills`, `neofetch`, `uptime`,
  `sudo`… (ArrowUp/Down ile geçmiş) — `public/terminal.js`.
- **TR / EN geçişi** — sağ üstteki buton; tercih `localStorage`'da saklanır.
- **Proje Modülleri** — `MOD-01…` etiketli kartlar; tech-stack etiketleri
  hex kodlu (ASCII baytırı): `0x50 59 → Python`.
- **Deneyim zaman çizelgesi** — commit geçmişi estetiğinde yıl düğümleri.
- **Canlı GitHub verisi** — istatistikler ve "Canlı Akış" GitHub API'den
  çalışma anında çekilir; yeni repo açtığında (fork olmayan, açıklaması
  dolu tabii ki daha şık) sitede otomatik belirir.
- **Teknik ızgara** — 1px dakika/saat çizgili arka plan; `Inter` gövde +
  `JetBrains Mono` başlık/kod.

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
