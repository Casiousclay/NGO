from pathlib import Path

root = Path(r'c:\Users\Casious Clay\Desktop\NGO')
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    new = text.replace('HopeBridge Foundation', 'Casious Foundation')
    new = new.replace('HopeBridge', 'Casious Foundation')
    if new != text:
        path.write_text(new, encoding='utf-8')
        print(path)
