---
name: style-templates
description: "Fill ready-made graphic templates with content and export PNG via render.py. Text/image fields only — never change the layout."
version: 1.0.0
category: creative
metadata:
  hermes:
    tags: [templates, graphics, png, render]
---

# GRAPHIC TEMPLATES (Style Template Editor)

## Rule
- Templates are designed by a human in the editor (http://127.0.0.1:8765). You only **fill them**.
- **Never invent layout**: don't change positions, sizes, colours or fonts, don't edit JSON in `templates/`, don't create templates.
- Only fields marked as fillable (`field`) can change. If text doesn't fit or a field is missing — tell the user.

## Commands (replace /path/to/style-template-editor)
```bash
cd /path/to/style-template-editor
python3 render.py --list                                  # templates and their fields
python3 render.py --template NAME --fields                # fields + defaults
python3 render.py --template NAME --set field=value --set other="Line 1\nLine 2" --out out/file.png
python3 render.py --template NAME --set image=/path/photo.jpg --out out/file.png   # image field
```
- Fields not given keep their template defaults. Unknown field → error (check `--fields`, don't guess).
- The "style inspired by @BkashJosi" header pill is part of the template — never remove it.
