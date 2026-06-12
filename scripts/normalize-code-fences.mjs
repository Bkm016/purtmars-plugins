import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const contentDocs = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'docs');

function normalize(text) {
  return text
    .replace(/^```bas$/gm, '```bash')
    .replace(/^```([a-z0-9+#-]+)\s+title="[^"]*"(?:\s+\{[^}]*\})?\s*$/gim, '```$1')
    .replace(/^```title="([^"]*)"\s*$/gim, (_, t) => {
      const lang = t.toLowerCase().includes('kether') ? 'kotlin' : 'text';
      return '```' + lang;
    })
    .replace(/^```([a-z0-9+#-]+)\s+title='[^']*'\s*$/gim, '```$1');
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
      continue;
    }
    if (!ent.name.endsWith('.mdx')) {
      continue;
    }
    const raw = fs.readFileSync(full, 'utf8');
    const next = normalize(raw);
    if (next !== raw) {
      fs.writeFileSync(full, next, 'utf8');
    }
  }
}

walk(contentDocs);
console.log('Normalized code fences');