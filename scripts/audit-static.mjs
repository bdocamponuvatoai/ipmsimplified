import { readFile, writeFile, stat } from "node:fs/promises";
import { pages, inlineScripts, hashScript, readManifest } from "./csp.mjs";
const failures = [];
const hashes = await readManifest();
const results = [];
for await (const { route, html } of pages()) {
  if (route === "/_global-error") continue;
  const allHashed = inlineScripts(html).every((s) =>
    hashes[route]?.includes(hashScript(s)),
  );
  const h1 = (html.match(/<h1[ >]/g) || []).length;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!allHashed || h1 !== 1 || !title) failures.push(route);
  results.push({ route, h1, title, cspInlineScriptsCovered: allHashed });
}
if (!results.some((r) => r.route === "/")) failures.push("no prerendered HTML found");
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
