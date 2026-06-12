import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const contentDocs = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'docs');

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
    if (!raw.startsWith('---')) {
      continue;
    }
    const end = raw.indexOf('\n---', 3);
    if (end === -1) {
      continue;
    }
    const block = raw.slice(3, end);
    if (/^title:/m.test(block)) {
      continue;
    }
    const body = raw.slice(end + 4);
    const m = body.match(/^#\s+(.+)$/m);
    const title = m ? m[1].trim() : ent.name.replace(/\.mdx$/, '');
    const newBlock = `title: ${JSON.stringify(title)}\n${block.trim()}`;
    fs.writeFileSync(full, `---\n${newBlock}\n---${body}`, 'utf8');
  }
}

walk(contentDocs);
console.log('Fixed MDX titles');