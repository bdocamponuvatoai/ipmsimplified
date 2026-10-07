import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
const failures = [];
const hashes = JSON.parse(await readFile("security/csp-hashes.json", "utf8"));
const results = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith(".html")) {
      const html = await readFile(p, "utf8");
      const route =
        p
          .replace(".next/server/app", "")
          .replace(/\.html$/, "")
          .replace(/\/index$/, "") || "/";
      if (route === "/_global-error") continue;
      const scripts = [
        ...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
      ];
      const allHashed = scripts.every((s) =>
        hashes[route]?.includes(
          "sha256-" + createHash("sha256").update(s[1]).digest("base64"),
        ),
      );
      const h1 = (html.match(/<h1[ >]/g) || []).length;
      const title = html.match(/<title>(.*?)<\/title>/)?.[1];
      if (!allHashed || h1 !== 1 || !title) failures.push(route);
      results.push({ route, h1, title, cspInlineScriptsCovered: allHashed });
    }
  }
}
await walk(".next/server/app");
const photos = JSON.parse(await readFile("content/photo-sizes.json", "utf8"));
let photoBudgetPass = true;
for (const photo of photos) {
  if ((await stat(photo.file)).size >= 120000) {
    photoBudgetPass = false;
    failures.push(photo.file);
  }
}
await writeFile(
  "audit-static.json",
  JSON.stringify({ results, photoBudgetPass, failures }, null, 2) + "\n",
);
console.log(
  `${results.length} static routes checked; ${failures.length} failures`,
);
if (failures.length) process.exitCode = 1;
