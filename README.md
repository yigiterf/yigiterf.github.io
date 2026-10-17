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

## Dağıtım (GitHub Pages) — adım adım

Site statik olarak derlenir ve GitHub Actions ile yayınlanır
(`.github/workflows/deploy.yml`).

### 1. GitHub'da repo oluştur

- https://github.com/new adresine git.
- **Repository name:** `yigiterf.github.io` (kullanıcı sitesi yalnızca bu
  isimle kök adreste yayınlanır — birebir bu isim olmalı).
- **Public** seç (ücretsiz Pages için şart).
- **README/gitignore/lisans ekleme** — repo zaten yerelde hazır.

### 2. Kimlik doğrulama kurulumu (bir kez)

**A) SSH anahtarı (önerilen)**

```bash
ssh-keygen -t ed25519 -C "beteljesed@gmail.com"
cat ~/.ssh/id_ed25519.pub
```

Çıkan anahtarı GitHub → Settings → SSH and GPG keys → **New SSH key**
bölümüne ekle. Test:

```bash
ssh -T git@github.com   # "Hi yigiterf!" mesajı görmelisin
```

**B) HTTPS + Personal Access Token** (SSH kullanmak istemezsen)

GitHub → Settings → Developer settings → Personal access tokens →
Tokens (classic) → Generate new token (classic) → yetkiler: `repo` **ve**
`workflow` (workflow dosyası push'ladığın için şart). Şifre sorulduğunda
token'ı yapıştır.

### 3. Remote ekle ve push'la

```bash
cd ~/portfolio
git remote add origin git@github.com:yigiterf/yigiterf.github.io.git
git push -u origin main
```

### 4. Pages'i aç

Repo → **Settings** → **Pages** → *Build and deployment* → **Source:
GitHub Actions**.

### 5. İlk yayını izle

- Repo → **Actions** → "Deploy to GitHub Pages" işi yeşil tik almalı
  (~1-2 dakika). Elle çalıştırmak için **Run workflow**.
- Bitince https://yigiterf.github.io adresini aç (önbellek varsa
  Ctrl+Shift+R ile yenile).

### 6. Sonraki güncellemeler

```bash
cd ~/portfolio
# içeriği düzenle, önizle: npm run dev
git add -A
git commit -m "açıklama"
git push
```

Her push otomatik olarak derleyip yayınlar. **Yeni repo açtığında hiçbir şey
yapmana gerek yok:** "Son Repolar" bölümü GitHub API'den çalışma anında
listelenir.

### Sorun giderme

| Belirti | Çözüm |
| --- | --- |
| Actions `npm ci` adımında hata | `npm install` çalıştırıp `package-lock.json`'ı commit'le |
| Adres 404 | Pages → Source = GitHub Actions mı? Repo adı birebir `yigiterf.github.io` mu? |
| CSS/JS yüklenmiyor | Repo adı farklıysa `astro.config.mjs`'e `base: '/repo-adi'` ekle ve `site` değerini güncelle |
| Eski içerik görünüyor | Tarayıcı önbelleği: Ctrl+Shift+R |
| Özel alan adı | Pages → Custom domain + DNS `CNAME` kaydı, ayrıca `public/CNAME` dosyası |

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

## Yapılacaklar (senin doldurman gerekenler)

- [ ] İletişim bölümündeki `mailto:örnek@posta.com` adresini e-postanla
      değiştir (`src/pages/index.astro` ve `public/terminal.js`).
- [ ] İstersen terminalde `neofetch` çıktısını kendine göre zenginleştir.
