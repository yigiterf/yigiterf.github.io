# yigiterf.github.io — Portfolyo Sitesi

https://yigiterf.github.io adresinde yayınlanan kişisel portfolyo sitesi.
Astro ile yazıldı; pastel zine estetiği, üç dilli arayüz (TR/EN/JA),
çalışan bir mini terminal ve canlı GitHub verisi içerir.

## Özellikler

- **Pastel zine estetiği** — fildişi kağıt zemin, kalın mürekkep kenarlıklar,
  sert gölgeler. İki font ailesi: `Space Grotesk` (metin) + `JetBrains Mono`
  (etiket/kod). Japonca için sistem CJK yedek fontları tanımlı.
- **3B dönen kırmızı üçgen** — header logosu dikey eksende (`rotateY`) kendi
  etrafında döner; arka yüz poligonuyla derinlik hissi verilir.
  `prefers-reduced-motion`'da durur.
- **Üç dilli arayüz** — sağ üstteki `TR / EN / JA` düğmeleri; seçim
  `localStorage`'da saklanır. Çeviriler `data-en` / `data-ja` öznitelikleriyle
  işaretlenir (`public/lang.js`).
- **Canlı çalışan konsol** — `help`, `whoami`, `ls`, `projects`, `skills`,
  `neofetch`, `uptime`… ArrowUp/Down ile komut geçmişi (`public/terminal.js`).
- **Proje kartları** — pastel plakalı, hafif eğik duran; hover'da düzelir.
  Sadece robotik / gömülü / DSP odaklı projeler listelenir; JS/web projeleri
  filtrelenir.
- **Canlı GitHub verisi** — künye kartındaki istatistikler ve "Son Repolar"
  bölümü GitHub API'den çalışma anında çekilir; yeni repo açtığında sitede
  kendiliğinden belirir.
- **Mobil uyumlu** — 360 px genişlikte bile yatay kaydırma yok; header alt
  satıra kırılır, proje ızgarası tek kolona düşer.
- Erişilebilirlik / SEO / best-practices: Lighthouse 100/100/100.

## Geliştirme

Node 22+ gerekir.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ üretir
npm run preview  # dist/ önizlemesi
```

## Dağıtım (GitHub Pages)

Yayın adresi: **https://yigiterf.github.io**

Düzen şöyle:

- **`main` dalı** → kaynak kod (bu repo).
- **`gh-pages` dalı** → derlenmiş statik site. GitHub Pages bu dalı yayınlıyor
  (Settings → Pages → *Deploy from a branch* → `gh-pages` / root).
- Derleme çıktısı (`dist/`) git'e girmez (`.gitignore`'da); `gh-pages` dalına
  yalnızca yayınlanacak dosyalar gider. Jekyll'in `_astro/` klasörünü yok
  saymaması için dala `.nojekyll` dosyası eklenir.

### Güncelleme akışı

```bash
cd ~/portfolio
npm run dev                                          # önizleme: localhost:4321
# … içeriği düzenle …

git add -A && git commit -m "açıklama" && git push    # kaynak kod GitHub'a
./deploy.sh "açıklama"                               # siteyi derle ve yayınla
```

`./deploy.sh` şunları yapar: `npm run build` → `dist/` içeriğini geçici bir
repoya kopyalar → `.nojekyll` ekler → `gh-pages` dalına push eder → sitenin
canlı olduğunu doğrular (HTTP 200 + başlık kontrolü). Bir sorun görürse
`./pages-onar.sh` çalıştırmanı önerir.
Yayın ~1 dakika içinde görünür. **Yeni repo açtığında hiçbir şey yapmana gerek
yok:** "Son Repolar" bölümü veriyi GitHub API'den çalışma anında çeker.

### GitHub Actions akışına geçmek istersen (isteğe bağlı)

Şu an otomatik derleme kapalı; sebebi: bu makinedeki kayıtlı git token'ında
`workflow` yetkisi yok ve GitHub, içinde workflow dosyası bulunan push'ları bu
token'la reddediyor. Üç adımda tam otomatik akışa geçebilirsin (sonrasında
`git push` tek başına yeterli olur, `./deploy.sh` gerekmez):

1. GitHub arayüzünde: **Add file → Create new file** → dosya adı
   `.github/workflows/deploy.yml` → içeriği `docs/github-actions-deploy.yml`
   dosyasından kopyala-yapıştır → **Commit**.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Bir sonraki `git push` işi tetikler; sonucu **Actions** sekmesinden izle.

> Alternatif: `workflow` yetkili yeni bir token ya da çalışan bir SSH anahtarı
> ile aynı dosyayı doğrudan push edebilirsin.

### Sorun giderme

| Belirti | Çözüm |
| --- | --- |
| Sitede README görünüyor | Pages → Source `gh-pages` / root olmalı; `./deploy.sh` çalıştır |
| `There isn't a GitHub Pages site here` (404) | Pages sitesi kapatılmış: `./pages-onar.sh` (yeniden oluşturur + derlemeyi tetikler) |
| CSS/JS yüklenmiyor | `gh-pages` dalında `.nojekyll` var mı? (`deploy.sh` ekler) |
| `refusing to allow ... workflow` hatası | Token'da `workflow` yetkisi yok; dosyayı web arayüzünden ekle |
| Eski içerik görünüyor | Ctrl+Shift+R; yayın ~1 dk gecikebilir |
| Adres 404 | Repo adı birebir `yigiterf.github.io` olmalı |
| Repo adı farklı | `astro.config.mjs` → `site` ve `base: '/repo-adi'` güncelle |
| Özel alan adı | Pages → Custom domain + DNS `CNAME` kaydı, ayrıca `public/CNAME` |

## Yeni proje eklemek / siteyi güncellemek

- **Öne çıkan projeler:** `src/data/projects.ts` içine yeni obje ekle.
  TR + EN + JA açıklama ve etiket girmeyi unutma
  (`tags: { tr, en, ja }`, `desc: { tr, en, ja }`).
- **Canlı bölüm:** hiçbir şey yapma — repoyu push'la, GitHub açıklamasını
  doldur, site kendiliğinden listeler.
- **Metinler:** `src/pages/index.astro` içinde TR metni yaz,
  `data-en="..."` ve `data-ja="..."` özniteliklerine diğer dilleri ekle.
- **Terminal:** `public/terminal.js` içindeki komutlar ve çıktılar.
- **Renkler / tema:** `src/styles/global.css` içindeki `:root` değişkenleri.
- **Yayına almak:** `git push` (kaynak) + `./deploy.sh` (site).

## Yapılacaklar (senin doldurman gerekenler)

- [x] İletişim e-postası ayarlandı: `ferhatyigiter.mail@gmail.com`
      (`src/pages/index.astro` ve `public/terminal.js`).
- [ ] İstersen terminalde `neofetch` çıktısını kendine göre zenginleştir.
