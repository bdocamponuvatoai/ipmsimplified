import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { collectHashes, manifestPath } from "./csp.mjs";

// Inline scripts embed the build ID, so it must be identical across every
// pass below and reproducible for the same commit.
const gitSha = () => {
  const r = spawnSync("git", ["rev-parse", "--short=12", "HEAD"], {
    encoding: "utf8",
  });
  return r.status === 0 ? r.stdout.trim() : "";
};
const releaseId =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.IPM_BUILD_ID ||
  gitSha() ||
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
const save = (hashes) =>
  writeFile(manifestPath, JSON.stringify(hashes, null, 2) + "\n");

// First pass discovers static inline scripts. Second embeds their hashes into Proxy.
build();
let expected = await collectHashes();
await save(expected);
build();
const actual = await collectHashes();
if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  expected = actual;
  await save(expected);
  build();
  if (JSON.stringify(await collectHashes()) !== JSON.stringify(expected))
    throw new Error("Static CSP hashes did not stabilize. Do not deploy.");
}
console.log("Static CSP hashes verified against final HTML.");

const audit = spawnSync(process.execPath, ["scripts/audit-static.mjs"], {
  stdio: "inherit",
  env: process.env,
});
if (audit.status !== 0) process.exit(audit.status || 1);
