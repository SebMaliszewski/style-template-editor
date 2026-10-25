#!/usr/bin/env python3
"""Local template editor server (binds to 127.0.0.1 by default; NT_HOST / NT_PORT to override)."""
import json, os, sys, tempfile, shutil
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, unquote
import ntcore
SETTINGS = os.path.join(ntcore.BASE, 'settings.json')
def code_of(e):
    m = str(e)
    if isinstance(e, FileNotFoundError): return 'not_found'
    for k, c in (('zła nazwa grafiki', 'bad_asset'), ('zła nazwa', 'bad_name'), ('20 MB', 'too_big'), ('PNG/JPG', 'bad_type'), ('Chromium nie', 'render'), ('Brak Chromium', 'no_chromium'), ('nie znaleziono', 'not_found')):
        if k in m: return c
    return 'generic'
PORT = int(os.environ.get('NT_PORT', '8765')); HOST = os.environ.get('NT_HOST', '127.0.0.1')
class H(SimpleHTTPRequestHandler):
    def __init__(s, *a, **k): super().__init__(*a, directory=ntcore.STATIC, **k)
    def err(s, e, code=400): return s.j({'error': str(e), 'code': code_of(e)}, code)
    def j(s, obj, code=200):
        b = json.dumps(obj, ensure_ascii=False).encode(); s.send_response(code)
        s.send_header('Content-Type', 'application/json; charset=utf-8'); s.send_header('Content-Length', len(b)); s.end_headers(); s.wfile.write(b)
    def body(s): return json.loads(s.rfile.read(int(s.headers.get('Content-Length', 0))) or b'{}')
    def route(s):
        p = urlparse(s.path).path; parts = [unquote(x) for x in p.strip('/').split('/')]
        return p, parts
    def do_GET(s):
        p, parts = s.route()
        try:
            if p == '/api/templates': return s.j(ntcore.list_templates())
            if p == '/api/settings': return s.j(json.load(open(SETTINGS)) if os.path.exists(SETTINGS) else {})
            if parts[:2] == ['api', 'templates'] and len(parts) == 3: return s.j(ntcore.load(parts[2]))
            if parts[0] == 'assets' and len(parts) == 2:
                b = open(ntcore.asset_path(parts[1]), 'rb').read(); s.send_response(200)
                s.send_header('Content-Type', 'image/png' if parts[1].endswith('.png') else 'image/jpeg'); s.send_header('Content-Length', len(b)); s.end_headers(); return s.wfile.write(b)
        except Exception as e: return s.err(e, 404)
        return super().do_GET()
    def do_POST(s):
        p, parts = s.route()
        try:
            if parts[:2] == ['api', 'templates'] and len(parts) == 3:
                ntcore.save(parts[2], s.body()); return s.j({'ok': True})
            if parts[:2] == ['api', 'duplicate'] and len(parts) == 4:
                ntcore.save(parts[3], ntcore.load(parts[2])); return s.j({'ok': True})
            if p == '/api/settings':
                d = s.body(); cur = json.load(open(SETTINGS)) if os.path.exists(SETTINGS) else {}
                if d.get('lang') in ('pl', 'en'): cur['lang'] = d['lang']
                json.dump(cur, open(SETTINGS, 'w')); return s.j(cur)
            if p == '/api/upload':
                n = int(s.headers.get('Content-Length', 0))
                if n > ntcore.MAXB: return s.j({'error': 'plik > 20 MB', 'code': 'too_big'}, 413)
                from urllib.parse import parse_qs
                fn = parse_qs(urlparse(s.path).query).get('name', ['img'])[0]
                return s.j({'src': ntcore.store_asset(s.rfile.read(n), fn)})
            if p == '/api/export':
                d = s.body(); fd, out = tempfile.mkstemp(suffix='.png'); os.close(fd); os.remove(out)
                ntcore.export_png(d['doc'], out, d.get('fields')); b = open(out, 'rb').read(); os.remove(out)
                s.send_response(200); s.send_header('Content-Type', 'image/png'); s.send_header('Content-Length', len(b)); s.end_headers(); return s.wfile.write(b)
        except Exception as e: return s.err(e)
        s.j({'error': 'nie znaleziono', 'code': 'not_found'}, 404)
    def do_DELETE(s):
        p, parts = s.route()
        try: os.remove(ntcore.path(parts[2])); return s.j({'ok': True})
        except Exception as e: return s.err(e)
    def end_headers(s):
        s.send_header('Cache-Control', 'no-cache, must-revalidate')  # przeglądarka zawsze pobiera aktualne render.js/index.html
        super().end_headers()
    def log_message(s, *a): pass
if __name__ == '__main__':
    for d in (ntcore.TPL, ntcore.ASSETS): os.makedirs(d, exist_ok=True)
    print('Style Template Editor: http://%s:%d' % (HOST, PORT), flush=True)
    ThreadingHTTPServer((HOST, PORT), H).serve_forever()
