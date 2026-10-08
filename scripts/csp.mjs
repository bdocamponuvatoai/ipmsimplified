import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";

export const manifestPath = "security/csp-hashes.json";
const serverDir = ".next/server";

export const inlineScripts = (html) =>
  [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  );

export const hashScript = (source) =>
  "sha256-" + createHash("sha256").update(source).digest("base64");

const toRoute = (path) =>
  "/" + path.replace(/\.html$/, "").replace(/(^|\/)index$/, "");

// Prerendered HTML lives in server/app for a plain build, but when a build
// adapter is configured (as on Vercel) Next.js writes it to
// server/route-cache/APP_PAGE/<hash>/$/<route>.html instead.
const routeOf = (file) => {
  const rel = file.slice(serverDir.length + 1);
  if (rel.startsWith("app/")) return toRoute(rel.slice(4));
  const cached = rel.match(/^route-cache\/APP_PAGE\/[^/]+\/\$\/(.+)$/);
  return cached ? toRoute(cached[1]) : null;
};

async function* walk(dir) {
  let items;
  try {
    items = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const item of items) {
    const file = `${dir}/${item.name}`;
    if (item.isDirectory()) yield* walk(file);
    else if (file.endsWith(".html")) yield file;
  }
}

// Yields every distinct prerendered HTML page in the current Next.js build.
export async function* pages() {
  const seen = new Set();
  for (const dir of [`${serverDir}/app`, `${serverDir}/route-cache/APP_PAGE`])
    for await (const file of walk(dir)) {
      const route = routeOf(file);
      if (!route) continue;
      const html = await readFile(file, "utf8");
      const key = `${route}\n${html}`;
      if (seen.has(key)) continue;
      seen.add(key);
      yield { route, html };
    }
}

export async function collectHashes() {
  const result = {};
  for await (const { route, html } of pages())
    result[route] = [
      ...new Set([...(result[route] || []), ...inlineScripts(html).map(hashScript)]),
    ];
  if (!result["/"])
    throw new Error(
      "No prerendered HTML found for '/'. The CSP hash manifest would be empty " +
        "and every inline script would be blocked. Do not deploy.",
    );
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

export const readManifest = async () =>
  JSON.parse(await readFile(manifestPath, "utf8"));
