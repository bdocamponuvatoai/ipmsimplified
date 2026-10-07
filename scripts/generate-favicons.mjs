import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = await readFile("app/icon.svg");
const sizes = [16, 32, 180, 192, 512];

await Promise.all(
  sizes.map(async (size) => {
    const icon = sharp(source, { density: Math.max(144, size * 3) }).resize(size, size, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    });

    if (size <= 32) icon.sharpen({ sigma: 0.55, m1: 0.8, m2: 1.4 });

    await icon
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: size <= 32 })
      .toFile(`public/icons/ipm-${size}.png`);
  }),
);

const icoSizes = [16, 32];
const icoImages = await Promise.all(
  icoSizes.map((size) => readFile(`public/icons/ipm-${size}.png`)),
);
const directorySize = 6 + icoImages.length * 16;
const icoHeader = Buffer.alloc(directorySize);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(icoImages.length, 4);

let offset = directorySize;
icoImages.forEach((image, index) => {
  const entry = 6 + index * 16;
  const size = icoSizes[index];
  icoHeader.writeUInt8(size, entry);
  icoHeader.writeUInt8(size, entry + 1);
  icoHeader.writeUInt8(0, entry + 2);
  icoHeader.writeUInt8(0, entry + 3);
  icoHeader.writeUInt16LE(1, entry + 4);
  icoHeader.writeUInt16LE(32, entry + 6);
  icoHeader.writeUInt32LE(image.length, entry + 8);
  icoHeader.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});

await writeFile("app/favicon.ico", Buffer.concat([icoHeader, ...icoImages]));

console.log(`Generated ${sizes.length} PNG assets and app/favicon.ico from app/icon.svg`);
