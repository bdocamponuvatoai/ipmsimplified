import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";
const local = new Map<string, { count: number; expires: number }>();
// Accept Upstash names or the Vercel Marketplace KV names.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const limiterConfigured = Boolean(url && token);
const distributed =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.slidingWindow(5, "15 m"),
        prefix: "ipm-demo",
        analytics: false,
      })
    : null;
export async function allowRequest(ip: string): Promise<boolean> {
  const key = createHash("sha256").update(ip).digest("hex");
  if (distributed) {
    const { success } = await distributed.limit(key);
    return success;
  }
  if (process.env.NODE_ENV === "production") return false;
  const now = Date.now();
  for (const [k, v] of local) if (v.expires < now) local.delete(k);
  if (local.size > 10000) local.delete(local.keys().next().value!);
  const entry = local.get(key) || { count: 0, expires: now + 900000 };
  entry.count++;
  local.set(key, entry);
  return entry.count <= 5;
}
