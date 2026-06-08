const fs = require("fs");

const BASE = "https://andy-chen.com";

const urls = fs
  .readdirSync(".")
  .filter((f) => f.endsWith(".html"))
  .map((f) => (f === "index.html" ? `${BASE}/` : `${BASE}/${f}`))
  .sort();

const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n");

fs.writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
);

console.log(`wrote ${urls.length} urls`);
