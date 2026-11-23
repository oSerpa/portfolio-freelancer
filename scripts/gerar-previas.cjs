/* eslint-disable @typescript-eslint/no-require-imports */
// Gera as imagens das prévias do carrossel (public/previas/<slug>.jpg).
// Uso: npm run build && npx next start -p 3123, depois node scripts/gerar-previas.cjs
const { chromium } = require("playwright");
const fs = require("fs");

const slugs = [...fs.readFileSync("src/data/demos.ts", "utf8").matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const base = process.env.BASE ?? "http://localhost:3123";

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  for (const s of slugs) {
    await p.goto(`${base}/modelos/${s}`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.querySelector("div.sticky.top-0.z-50")?.remove());
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `public/previas/${s}.jpg`, type: "jpeg", quality: 82 });
    console.log("ok", s);
  }
  await b.close();
})();
