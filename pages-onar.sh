#!/usr/bin/env bash
# ------------------------------------------------------------------
# "There isn't a GitHub Pages site here" (404) durumunu onarır.
#
# Ne yapar: Pages sitesi kapalıysa yeniden oluşturur; kaynağı
# `gh-pages` / (root) olarak sabitler, derlemeyi tetikler ve sitenin
# canlı olduğunu doğrular.
#
# Kullanım:
#   ./pages-onar.sh
# ------------------------------------------------------------------
set -euo pipefail

REPO="yigiterf/yigiterf.github.io"
SITE="https://yigiterf.github.io"
CRED="$HOME/.git-credentials"

TOKEN="$(grep github.com "$CRED" 2>/dev/null | head -1 | sed -E 's#https://[^:]+:([^@]+)@github.com#\1#')"

if [ -z "${TOKEN:-}" ]; then
  cat <<'EOF'
⚠ Yerel git token'ı bulunamadı (~/.git-credentials).
  Tarayıcıdan elle düzelt:
    repo → Settings → Pages → Source: Deploy from a branch → gh-pages / (root)
EOF
  exit 1
fi

api() { curl -s -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github+json" "$@"; }
BODY='{"build_type":"legacy","source":{"branch":"gh-pages","path":"/"}}'

STATUS="$(api "https://api.github.com/repos/$REPO/pages" | grep -o '"status": *"[a-z]*"' | head -1 || true)"

if [ -n "$STATUS" ]; then
  echo "→ Pages mevcut ($STATUS) — kaynak gh-pages/(root) olarak sabitleniyor…"
  api -X PUT "https://api.github.com/repos/$REPO/pages" -d "$BODY" >/dev/null
else
  echo "→ Pages sitesi kapalı — yeniden oluşturuluyor…"
  api -X POST "https://api.github.com/repos/$REPO/pages" -d "$BODY" >/dev/null
fi

echo "→ derleme tetiklendi"
api -X POST "https://api.github.com/repos/$REPO/pages/builds" >/dev/null || true

for i in $(seq 1 20); do
  CODE="$(curl -s -o /dev/null -w '%{http_code}' -H 'Cache-Control: no-cache' "$SITE/?fix=$i" 2>/dev/null || echo 000)"
  if [ "$CODE" = "200" ]; then
    echo "✓ site yayında — $SITE"
    exit 0
  fi
  sleep 6
done

echo "⚠ Site hâlâ 200 dönmüyor (HTTP $CODE)."
echo "  Derleme durumunu kontrol et: https://github.com/$REPO/deployments"
