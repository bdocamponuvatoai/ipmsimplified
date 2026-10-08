import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";

export const manifestPath = "security/csp-hashes.json";
const appDir = ".next/server/app";

export const inlineScripts = (html) =>
  [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  );

export const hashScript = (source) =>
  "sha256-" + createHash("sha256").update(source).digest("base64");

const routeOf = (file) =>
  file
    .replace(appDir, "")
    .replace(/\.html$/, "")
    .replace(/\/index$/, "") || "/";

// Yields every prerendered HTML page in the current Next.js build.
export async function* pages(dir = appDir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${item.name}`;
    if (item.isDirectory()) yield* pages(file);
    else if (file.endsWith(".html"))
      yield { route: routeOf(file), html: await readFile(file, "utf8") };
  }
}

export async function collectHashes() {
  const result = {};
  for await (const { route, html } of pages())
    result[route] = [...new Set(inlineScripts(html).map(hashScript))];
  return result;
}

export const readManifest = async () =>
  JSON.parse(await readFile(manifestPath, "utf8"));
