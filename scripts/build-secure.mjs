import { spawnSync } from "node:child_process";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const releaseId =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.IPM_BUILD_ID ||
  `ipm-${Date.now().toString(36)}`;
const build = () => {
  const r = spawnSync(
    process.execPath,
    ["node_modules/next/dist/bin/next", "build"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        IPM_BUILD_ID: releaseId,
      },
    },
  );
  if (r.status !== 0) process.exit(r.status || 1);
};
async function collect() {
  const result = {};
  async function walk(dir) {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const file = `${dir}/${item.name}`;
      if (item.isDirectory()) await walk(file);
      else if (file.endsWith(".html")) {
        const html = await readFile(file, "utf8");
        const route =
          file
            .replace(".next/server/app", "")
            .replace(/\.html$/, "")
            .replace(/\/index$/, "") || "/";
        result[route] = [
          ...new Set(
            [
              ...html.matchAll(
                /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g,
              ),
            ].map(
              (m) =>
                "sha256-" + createHash("sha256").update(m[1]).digest("base64"),
            ),
          ),
        ];
      }
    }
  }
  await walk(".next/server/app");
  return result;
}
// First pass discovers static inline scripts. Second embeds their hashes into Proxy.
build();
let expected = await collect();
await writeFile(
  "security/csp-hashes.json",
  JSON.stringify(expected, null, 2) + "\n",
);
build();
const actual = await collect();
if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  expected = actual;
  await writeFile(
    "security/csp-hashes.json",
    JSON.stringify(expected, null, 2) + "\n",
  );
  build();
  if (JSON.stringify(await collect()) !== JSON.stringify(expected))
    throw new Error("Static CSP hashes did not stabilize. Do not deploy.");
}
console.log("Static CSP hashes verified against final HTML.");

const audit = spawnSync(process.execPath, ["scripts/audit-static.mjs"], {
  stdio: "inherit",
  env: process.env,
});
if (audit.status !== 0) process.exit(audit.status || 1);
