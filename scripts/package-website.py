"""Build a standalone offline page and its downloadable ZIP. Run from repo root."""
from pathlib import Path
import base64
import zipfile

root = Path(__file__).resolve().parent.parent
page = (root / 'index.html').read_text()
page = page.replace('<link rel="stylesheet" href="assets/style.css">', '<style>' + (root / 'assets/style.css').read_text() + '</style>')
for name in ('config', 'app'):
    page = page.replace(f'<script src="assets/{name}.js" defer></script>', '')
# Inline scripts run after the document, including when opened directly from disk.
scripts = '\n'.join((root / f'assets/{name}.js').read_text() for name in ('config', 'app'))
page = page.replace('</body>', '<script>\n' + scripts + '\n</script></body>')
for asset in ('favicon.svg', 'Элегантный деловой портрет в офисе.png'):
    path = root / 'assets' / asset
    if path.exists():
        mime = {'.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png'}[path.suffix]
        page = page.replace('assets/' + asset, 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode())
out = root / 'ready-to-share'
out.mkdir(exist_ok=True)
(out / 'website.html').write_text(page)
with zipfile.ZipFile(out / 'website-ready.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    archive.write(out / 'website.html', 'website.html')
print('Built ready-to-share/website.html and ready-to-share/website-ready.zip')
