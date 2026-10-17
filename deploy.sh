#!/usr/bin/env bash
# ------------------------------------------------------------------
# Siteyi derler, GitHub Pages'in yayınladığı `gh-pages` dalına gönderir
# ve yayının gerçekten canlı olduğunu doğrular.
#
# Kullanım:
#   ./deploy.sh                  # otomatik mesajla yayınla
#   ./deploy.sh "yeni proje ekledim"
# ------------------------------------------------------------------
set -euo pipefail

MSG="${1:-site güncellendi: $(date +%Y-%m-%d\ %H:%M)}"
REMOTE="$(git remote get-url origin)"
NAME="$(git config user.name || echo yigiterf)"
EMAIL="$(git config user.email || echo yigiterf@users.noreply.github.com)"

echo "→ derleniyor…"
npm run build

TMP="$(mktemp -d)"
cp -r dist/. "$TMP/"
touch "$TMP/.nojekyll"   # Jekyll'in _astro klasörünü yok saymasını engeller

cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$NAME" -c user.email="$EMAIL" commit -qm "$MSG"
git push -f "$REMOTE" gh-pages:gh-pages
cd - >/dev/null
rm -rf "$TMP"

echo "→ yayın bekleniyor (GitHub derlemesi ~1 dk)…"
CODE=000
for i in $(seq 1 20); do
  CODE="$(curl -s -o /tmp/portfolyo-live.html -w '%{http_code}' -H 'Cache-Control: no-cache' \
    "https://yigiterf.github.io/?deploy=$i" 2>/dev/null || echo 000)"
  if [ "$CODE" = "200" ] && grep -q 'Ferhat Yiğiter' /tmp/portfolyo-live.html 2>/dev/null; then
    echo "✓ yayında — https://yigiterf.github.io"
    exit 0
  fi
  sleep 6
done

echo "⚠ Site henüz düzgün yanıt vermiyor (HTTP $CODE)."
echo "  En olası sebep: GitHub Pages sitesi kapatılmış (adres 404)."
echo "  Düzeltmek için: ./pages-onar.sh"
exit 1
