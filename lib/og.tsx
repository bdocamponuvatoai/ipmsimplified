import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
// Read colours from the canonical CSS tokens to avoid duplicated palette values.
export async function socialImage(title: string) {
  const css = await readFile(
    path.join(process.cwd(), "app/globals.css"),
    "utf8",
  );
  const token = (name: string) =>
    css.match(new RegExp(`--color-${name}:([^;]+);`))?.[1] || "currentColor";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: token("night"),
          color: token("white"),
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "68%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: token("sky"),
              letterSpacing: 4,
            }}
          >
            I / P / M · Simplified
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 18, color: token("haze"), display: "flex" }}>
            COMPLIANCE SOFTWARE FOR THE BUILT ENVIRONMENT
          </div>
        </div>
        <svg
          width="300"
          height="420"
          viewBox="0 0 300 420"
          style={{ position: "absolute", right: 24, top: 100 }}
        >
          <g fill="none" stroke={token("sky")} strokeWidth="2">
            <path d="M20 110 160 30 280 100 140 180Z M20 110V310L140 390 280 310V100 M140 180V390 M20 180 140 260 280 180 M20 245 140 325 280 245 M160 100V320 M160 175 245 126 M160 245 245 196 M160 310 245 261" />
          </g>
        </svg>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
