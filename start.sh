#!/usr/bin/env bash
# Start the editor on http://127.0.0.1:${NT_PORT:-8765}
cd "$(dirname "$0")" && exec python3 server.py
