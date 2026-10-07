import { spawnSync } from "node:child_process";

const commands = ["lint", "typecheck", "test", "build", "audit:bundle"];
const npmCli = process.env.npm_execpath;

if (!npmCli) throw new Error("Run this verifier through `npm run check`.");

for (const command of commands) {
  const result = spawnSync(process.execPath, [npmCli, "run", command], {
    stdio: "inherit",
  });

  if (result.status !== 0) process.exit(result.status || 1);
}
