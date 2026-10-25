#!/usr/bin/env bash
# Installs a systemd *user* service so the editor starts at login/boot (127.0.0.1 only).
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)"; UNIT=~/.config/systemd/user/style-template-editor.service
mkdir -p ~/.config/systemd/user
sed "s|@DIR@|$DIR|g" "$DIR/scripts/style-template-editor.service.in" > "$UNIT"
chmod +x "$DIR/start.sh"
systemctl --user daemon-reload
systemctl --user enable --now style-template-editor.service
echo "Installed: $UNIT"
echo "Tip: to start without logging in run: sudo loginctl enable-linger $USER"
systemctl --user --no-pager status style-template-editor.service | head -5
