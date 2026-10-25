"""Shared helpers: templates on disk + PNG export via headless Chromium/Chrome/Edge."""
import json, os, re, shutil, subprocess, sys, tempfile, uuid, pathlib
BASE = os.path.dirname(os.path.abspath(__file__))
TPL = os.path.join(BASE, 'templates'); STATIC = os.path.join(BASE, 'static')
ASSETS = os.path.join(BASE, 'assets'); MAXB = 20 * 1024 * 1024
def img_ext(b):
    if b[:8] == b'\x89PNG\r\n\x1a\n': return '.png'
    if b[:3] == b'\xff\xd8\xff': return '.jpg'
    return None
def store_asset(data, filename='img'):
    """Zapisuje grafikę w assets/ (walidacja magic bytes, limit 20 MB). Nazwa = hash treści, więc identyczna grafika = ten sam plik."""
    import hashlib
    if len(data) > MAXB: raise ValueError('plik > 20 MB')
    ext = img_ext(data)
    if not ext: raise ValueError('dozwolone tylko PNG/JPG (sprawdzane po zawartości)')
    stem = re.sub(r'[^A-Za-z0-9_-]', '_', os.path.splitext(os.path.basename(filename))[0])[:40] or 'img'
    name = hashlib.sha256(data).hexdigest()[:12] + '-' + stem + ext
    p = os.path.join(ASSETS, name)
    if not os.path.exists(p): open(p, 'wb').write(data)
    return name
def asset_path(name):
    if not re.fullmatch(r'[A-Za-z0-9_.-]+', name or '') or name.startswith('.'): raise ValueError('zła nazwa grafiki')
    return os.path.join(ASSETS, name)
def safe(name):
    n = re.sub(r'[^A-Za-z0-9_\-ąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]', '', name).strip()
    if not n: raise ValueError('zła nazwa')
    return n
def path(name): return os.path.join(TPL, safe(name) + '.json')
def list_templates():
    out = []
    for f in sorted(os.listdir(TPL)):
        if f.endswith('.json'):
            d = json.load(open(os.path.join(TPL, f), encoding='utf-8'))
            out.append({'name': f[:-5], 'fields': [e['field'] + (' (grafika)' if e.get('type') == 'image' else '') for e in d.get('elements', []) if e.get('field')]})
    return out
def load(name): return json.load(open(path(name), encoding='utf-8'))
def save(name, doc):
    with open(path(name), 'w', encoding='utf-8') as f: json.dump(doc, f, ensure_ascii=False, indent=2)
def size(d):
    w, h = d['w'], d['h']
    if (d.get('orientation') == 'horizontal' and h > w) or (d.get('orientation') == 'vertical' and w > h): w, h = h, w
    return w, h
def chromium():
    """Find a Chromium-based browser. Override with env NT_CHROME=/path/to/browser."""
    env = os.environ.get('NT_CHROME')
    if env:
        if os.path.exists(env) or shutil.which(env): return shutil.which(env) or env
        raise RuntimeError('Brak Chromium: NT_CHROME=%s nie istnieje' % env)
    for c in ('chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable', 'chrome', 'msedge', 'microsoft-edge'):
        p = shutil.which(c)
        if p: return p
    cands = []
    if sys.platform.startswith('win'):
        for base in (os.environ.get('PROGRAMFILES', r'C:\Program Files'), os.environ.get('PROGRAMFILES(X86)', r'C:\Program Files (x86)'), os.environ.get('LOCALAPPDATA', '')):
            if base:
                cands += [os.path.join(base, r'Google\Chrome\Application\chrome.exe'), os.path.join(base, r'Microsoft\Edge\Application\msedge.exe'), os.path.join(base, r'Chromium\Application\chrome.exe')]
    elif sys.platform == 'darwin':
        cands += ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']
    for c in cands:
        if os.path.exists(c): return c
    raise RuntimeError('Brak Chromium/Chrome/Edge (Linux: sudo apt install chromium; or set NT_CHROME)')
def export_png(doc, out, fields=None):
    w, h = size(doc)
    tmp = os.path.join(STATIC, '_r_%s.html' % uuid.uuid4().hex)
    src = open(os.path.join(STATIC, 'render.html'), encoding='utf-8').read()
    inj = '<script>window.__DOC__=%s;window.__FIELDS__=%s;</script>' % (json.dumps(doc), json.dumps(fields or {}))
    open(tmp, 'w', encoding='utf-8').write(src.replace('<div id="c">', inj + '<div id="c">', 1))
    prof = tempfile.mkdtemp(prefix='ntchrome')
    try:
        r = subprocess.run([chromium(), '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
            '--force-device-scale-factor=1', '--user-data-dir=' + prof, '--virtual-time-budget=4000',
            '--window-size=%d,%d' % (w, h), '--screenshot=' + os.path.abspath(out), pathlib.Path(tmp).as_uri()],
            capture_output=True, text=True, timeout=90)
        if not os.path.exists(out): raise RuntimeError('Chromium nie utworzył PNG: ' + r.stderr[-800:])
    finally:
        os.remove(tmp); shutil.rmtree(prof, ignore_errors=True)
    return out
