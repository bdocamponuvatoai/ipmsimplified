import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const routes = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${item.name}`;
    if (item.isDirectory()) await walk(file);
    else if (file.endsWith(".html")) {
      const html = await readFile(file, "utf8");
      const scripts = [
        ...new Set(
          [...html.matchAll(/<script\b[^>]*src="([^"?]+)[^"]*"/g)].map(
            (m) => m[1],
          ),
        ),
      ];
      let bytes = 0;
      let legacyBytes = 0;
      const files = [];
      for (const src of scripts) {
        if (!src.startsWith("/_next/")) continue;
        const buffer = await readFile(".next/" + src.replace("/_next/", ""));
        const gzip = gzipSync(buffer).byteLength;
        const legacy = src.includes("polyfills-");
        if (legacy) legacyBytes += gzip;
        else bytes += gzip;
        files.push({ file: src, gzip, legacy });
      }
      routes.push({
        route:
          file
            .replace(".next/server/app", "")
            .replace(/\.html$/, "")
            .replace(/\/index$/, "") || "/",
        htmlBytes: Buffer.byteLength(html),
        firstLoadJsGzip: bytes,
        legacyPolyfillGzip: legacyBytes,
        under100KB: bytes < 100000,
        files,
        h1Count: (html.match(/<h1[ >]/g) || []).length,
      });
    }
  }
}
await walk(".next/server/app");
const motionFiles = [
  "components/motion/Reveal.tsx",
  "components/motion/StatusFlip.tsx",
  "components/Header.tsx",
  "components/BackToTop.tsx",
];
const motion = gzipSync(
  (await Promise.all(motionFiles.map((p) => readFile(p, "utf8")))).join("\n"),
).byteLength;
const media = await readdir(".next/static/media");
const fontSizes = await Promise.all(
  media
    .filter((p) => /\.woff2?$/.test(p))
    .map(async (p) => ({
      file: p,
      bytes: (await stat(".next/static/media/" + p)).size,
    })),
);
const report = {
  generatedAt: new Date().toISOString(),
  method:
    "Gzip each unique script src in prerendered HTML. Includes framework. Legacy nomodule polyfill is reported separately and excluded from modern-browser first load. Browser transfer sizes can differ.",
  motionSourceGzip: motion,
  motionNote:
    "Includes header and primitives, excludes shared React runtime. This measures source, not isolated emitted chunks.",
  emittedFontFiles: fontSizes,
  emittedFontBytes: fontSizes.reduce((n, p) => n + p.bytes, 0),
  routes,
};
await writeFile("audit-results.json", JSON.stringify(report, null, 2) + "\n");
console.table(
  routes.map(({ route, firstLoadJsGzip, under100KB, h1Count }) => ({
    route,
    firstLoadJsGzip,
    under100KB,
    h1Count,
  })),
);
console.log("Motion source gzip:", motion, "bytes");
console.log(
  "All emitted font files:",
  report.emittedFontBytes,
  "bytes (includes unused unicode subsets).",
);
