#!/usr/bin/env python3
"""CLI dla Pati: wypełnia pola tekstowe szablonu i eksportuje PNG. Nie zmienia układu.
  render.py --list
  render.py --template NAZWA --fields            (pokaż pola)
  render.py --template NAZWA --set pole=wartość [--set ...] --out plik.png
  pole graficzne: --set logo=/ścieżka/do/obrazu.png (PNG/JPG, kopiowane do assets/)
"""
import argparse, os, sys, ntcore
a = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
a.add_argument('--list', action='store_true'); a.add_argument('--template'); a.add_argument('--fields', action='store_true')
a.add_argument('--set', action='append', default=[], metavar='pole=wartość'); a.add_argument('--out')
o = a.parse_args()
if o.list:
    for t in ntcore.list_templates(): print(t['name'], '\tpola:', ', '.join(t['fields']) or '-')
    sys.exit(0)
if not o.template: a.error('podaj --template lub --list')
doc = ntcore.load(o.template)
known = {e['field']: e.get('src' if e.get('type') == 'image' else 'text', '') for e in doc.get('elements', []) if e.get('field')}
imgf = {e['field'] for e in doc.get('elements', []) if e.get('field') and e.get('type') == 'image'}
if o.fields:
    for k, v in known.items(): print('%s\t(domyślnie: %r)' % (k, v))
    sys.exit(0)
f = {}
for s in o.set:
    if '=' not in s: a.error('--set wymaga pole=wartość')
    k, v = s.split('=', 1)
    if k not in known: sys.exit('Nieznane pole "%s". Dostępne: %s' % (k, ', '.join(known)))
    if k in imgf:
        try: f[k] = ntcore.store_asset(open(os.path.expanduser(v), 'rb').read(), v)
        except Exception as e: sys.exit('Pole %s: %s' % (k, e))
    else: f[k] = v.replace('\\n', '\n')
if not o.out: a.error('podaj --out plik.png')
print(ntcore.export_png(doc, o.out, f))
