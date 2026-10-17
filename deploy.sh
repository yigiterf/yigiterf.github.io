#!/usr/bin/env bash
# ------------------------------------------------------------------
# Siteyi derler ve GitHub Pages'in yayınladığı `gh-pages` dalına gönderir.
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

echo "✓ yayınlandı — https://yigiterf.github.io (yaklaşık 1 dakika içinde görünür)"
