import { pages, inlineScripts, hashScript, readManifest } from "./csp.mjs";

// Guards `npm start`: a build made without `npm run build` serves inline
// scripts the CSP does not allow, so the page never hydrates.
let manifest;
try {
  manifest = await readManifest();
} catch {
  manifest = {};
}

const stale = [];
try {
  for await (const { route, html } of pages()) {
    if (route === "/_global-error") continue;
    const allowed = manifest[route] || [];
    if (!inlineScripts(html).every((s) => allowed.includes(hashScript(s))))
      stale.push(route);
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  console.error("No production build found. Run `npm run build` first.");
  process.exit(1);
}

if (stale.length) {
  console.error(
    `CSP hashes do not match this build (${stale.join(", ")}).\n` +
      "Inline scripts would be blocked and client JavaScript would not run.\n" +
      "Rebuild with `npm run build`, not `next build`.",
  );
  process.exit(1);
}
console.log("CSP hashes match the current build.");
