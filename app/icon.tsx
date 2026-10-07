import { iconImage } from "@/lib/icon";
export const contentType = "image/png";
export function generateImageMetadata() {
  return [16, 32, 192, 512].map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType: "image/png",
  }));
}
export default async function Icon({ id }: { id: string }) {
  return iconImage(Number(await id));
}
