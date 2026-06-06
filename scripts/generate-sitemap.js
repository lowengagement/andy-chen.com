// Generates sitemap.xml from the site's HTML files.
// Usage: node scripts/generate-sitemap.js  (run from the project root)

const fs = require("node:fs");
const path = require("node:path");

const BASE_URL = "https://andy-chen.com";
const SITE_DIR = process.cwd();
const SKIP_DIRS = new Set([".git", ".vercel", "node_modules", "scripts"]);

function findHtmlFiles(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) findHtmlFiles(fullPath, found);
    else if (entry.name.endsWith(".html")) found.push(fullPath);
  }
  return found;
}

function pathToUrl(filePath) {
  const slug = path
    .relative(SITE_DIR, filePath)
    .split(path.sep)
    .join("/")
    .replace(/(^|\/)index\.html$/, "$1")
    .replace(/\/$/, "");
  return slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;
}

function buildSitemap(pages) {
  const body = pages
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

const pages = findHtmlFiles(SITE_DIR)
  .map((file) => ({
    loc: pathToUrl(file),
    lastmod: fs.statSync(file).mtime.toISOString().slice(0, 10),
  }))
  .sort((a, b) => a.loc.localeCompare(b.loc));

fs.writeFileSync(path.join(SITE_DIR, "sitemap.xml"), buildSitemap(pages));
console.log(`sitemap.xml written with ${pages.length} URLs`);