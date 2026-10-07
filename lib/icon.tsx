import { readFile } from "node:fs/promises";

const supportedSizes = new Set([16, 32, 180, 192, 512]);

export async function iconImage(requestedSize: number) {
  const size = supportedSizes.has(requestedSize) ? requestedSize : 512;
  const png = await readFile(`public/icons/ipm-${size}.png`);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
