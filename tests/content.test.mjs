import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { products, heroCopy, principle } from "../content/products.ts";
import { programs } from "../content/programs.ts";
import { demoSchema } from "../lib/schema.ts";
test("verbatim headline and company copy preserved", async () => {
  const hero = await readFile("components/sections/Hero.tsx", "utf8");
  assert.match(hero, /One building\./);
  assert.match(hero, /Three <em>records\.<\/em>/);
  assert.equal(
    heroCopy,
    "IPM Simplified builds the systems that hold them. A city reviews the drawings and issues the permit. An authority keeps the register of everything that building owes, across every program it enforces. An owner and their contractors keep the proof it was done. Same building, three different people responsible — so we build three products, and each one stands on its own.",
  );
  assert.ok(principle.startsWith("The same object underneath."));
});
test("only approved citations and three independent products", () => {
  assert.deepEqual(
    programs.map((p) => p.citation),
    [
      "NFPA 72",
      "NFPA 25",
      "NFPA 25 Ch. 8 / NFPA 20",
      "NFPA 96 / 17A / 2001",
      "NFPA 10",
      "NFPA 101 / 80 / IFC 909",
      "cross-connection control",
      "ASME A17.1 / NFPA 110",
    ],
  );
  assert.equal(products.length, 3);
});
test("shared schema rejects missing interest, invalid email and oversized payload", () => {
  const valid = {
    name: "Example Person",
    email: "person@example.org",
    organisation: "Example Office",
    role: "Jurisdiction",
    products: ["InspectionSimplified"],
    message: "",
  };
  assert.ok(demoSchema.safeParse(valid).success);
  for (const bad of [
    { ...valid, email: "invalid" },
    { ...valid, products: [] },
    { ...valid, message: "x".repeat(3001) },
    { ...valid, role: "Unspecified" },
    { ...valid, products: ["Unknown"] },
  ])
    assert.equal(demoSchema.safeParse(bad).success, false);
});
test("motion source comfortably fits 6 KB gzip budget", async () => {
  const files = [
    "components/BackToTop.tsx",
    "components/motion/Reveal.tsx",
    "components/motion/StatusFlip.tsx",
    "components/Header.tsx",
  ];
  const sources = await Promise.all(files.map((f) => readFile(f, "utf8")));
  assert.ok(gzipSync(sources.join("\n")).byteLength < 6000);
});
