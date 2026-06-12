import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const oldDocs = path.join(root, '..', 'purtmars-plugins', 'docs');
const oldStatic = path.join(root, '..', 'purtmars-plugins', 'static');
const contentDocs = path.join(root, 'content', 'docs');
const publicDir = path.join(root, 'public');

const CALLOUT_MAP = {
  tip: 'Callout',
  info: 'Callout',
  note: 'Callout',
  warning: 'Callout',
  danger: 'Callout',
};

const CALLOUT_TYPE = {
  tip: 'info',
  info: 'info',
  note: 'info',
  warning: 'warn',
  danger: 'error',
};

function rmrf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) {
    return { data: {}, body: raw };
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, body: raw };
  }
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, '');
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!m) {
      continue;
    }
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[m[1]] = val;
  }
  return { data, body };
}

function extractTitleFromBody(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function convertCallouts(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const open = lines[i].match(/^:::(tip|info|note|warning|danger)(?:\s+(.*))?$/);
    if (!open) {
      out.push(lines[i]);
      i += 1;
      continue;
    }
    const kind = open[1];
    const title = open[2]?.trim();
    i += 1;
    const inner = [];
    while (i < lines.length && lines[i].trim() !== ':::') {
      inner.push(lines[i]);
      i += 1;
    }
    if (i < lines.length) {
      i += 1;
    }
    const typeAttr = CALLOUT_TYPE[kind] ?? 'info';
    const titleAttr = title ? ` title="${title.replace(/"/g, '\\"')}"` : '';
    out.push(`<${CALLOUT_MAP[kind]} type="${typeAttr}"${titleAttr}>`);
    out.push(...inner);
    out.push(`</${CALLOUT_MAP[kind]}>`);
  }
  return out.join('\n');
}

function convertCategoryToMeta(dir) {
  const catPath = path.join(dir, '_category_.json');
  if (!fs.existsSync(catPath)) {
    return;
  }
  const cat = JSON.parse(fs.readFileSync(catPath, 'utf8'));
  const pages = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === '_category_.json') {
      continue;
    }
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      pages.push(ent.name);
      continue;
    }
    if (/\.(md|mdx)$/i.test(ent.name)) {
      pages.push(ent.name.replace(/\.(md|mdx)$/i, ''));
    }
  }
  const meta = {
    title: cat.label ?? path.basename(dir),
    pages,
    defaultOpen: cat.collapsed === false,
  };
  fs.writeFileSync(path.join(dir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
  fs.unlinkSync(catPath);
}

function walkMigrate(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const ent of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, ent.name);
    if (ent.name === '_category_.json') {
      fs.copyFileSync(src, path.join(destDir, ent.name));
      continue;
    }
    const dest = path.join(destDir, ent.name);
    if (ent.isDirectory()) {
      walkMigrate(src, dest);
      continue;
    }
    if (ent.name === 'start.md' || ent.name === 'start.mdx') {
      continue;
    }
    if (!/\.(md|mdx)$/i.test(ent.name)) {
      continue;
    }
    const raw = fs.readFileSync(src, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    let text = convertCallouts(body);
    text = text
      .replace(/^```bas$/gm, '```bash')
      .replace(/^```([a-z0-9+#-]+)\s+title="[^"]*"(?:\s+\{[^}]*\})?\s*$/gim, '```$1')
      .replace(/^```title="([^"]*)"\s*$/gim, (_, t) => {
        const lang = t.toLowerCase().includes('kether') ? 'kotlin' : 'text';
        return '```' + lang;
      });
    const isIndex = ent.name === 'index.md' || ent.name === 'index.mdx';
    const baseName = ent.name.replace(/\.(md|mdx)$/i, '');
    const outName = isIndex ? 'index.mdx' : `${baseName}.mdx`;
    const outPath = path.join(destDir, outName);
    const fm = [];
    const title = data.title || extractTitleFromBody(text) || baseName;
    fm.push(`title: ${JSON.stringify(title)}`);
    if (data.description) {
      fm.push(`description: ${JSON.stringify(data.description)}`);
    }
    if (data.sidebar_position) {
      fm.push(`sidebar_position: ${data.sidebar_position}`);
    }
    if (data.slug === '/') {
      fm.push('full: true');
    }
    const header = `---\n${fm.join('\n')}\n---\n\n`;
    fs.writeFileSync(outPath, header + text, 'utf8');
  }
}

rmrf(contentDocs);
fs.mkdirSync(contentDocs, { recursive: true });
walkMigrate(oldDocs, contentDocs);

function walkConvertMeta(dir) {
  convertCategoryToMeta(dir);
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      walkConvertMeta(path.join(dir, ent.name));
    }
  }
}
walkConvertMeta(contentDocs);

const startSrc = path.join(oldDocs, 'start.md');
if (fs.existsSync(startSrc)) {
  const raw = fs.readFileSync(startSrc, 'utf8');
  const { body } = parseFrontmatter(raw);
  const text = convertCallouts(body);
  fs.writeFileSync(
    path.join(contentDocs, 'index.mdx'),
    `---\ntitle: 前言\nfull: true\n---\n\n${text}`,
    'utf8',
  );
}

rmrf(publicDir);
fs.mkdirSync(publicDir, { recursive: true });
copyDir(path.join(oldStatic, 'img'), path.join(publicDir, 'img'));

const rootMetaPath = path.join(contentDocs, 'meta.json');
const rootPages = ['index'];
for (const ent of fs.readdirSync(contentDocs, { withFileTypes: true })) {
  if (!ent.isDirectory()) {
    continue;
  }
  if (ent.name === 'index') {
    continue;
  }
  rootPages.push(ent.name);
}
fs.writeFileSync(
  rootMetaPath,
  `${JSON.stringify({ title: 'Purtmars Plugins', pages: rootPages }, null, 2)}\n`,
  'utf8',
);

console.log('Migrated content to', contentDocs);