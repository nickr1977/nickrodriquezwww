import crypto from "crypto";

export const ADMIN_COOKIE = "admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET environment variable is not set");
  return secret;
}

export function getExpectedToken(): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update("admin-session")
    .digest("hex");
}

export function isValidToken(token: string): boolean {
  const expected = getExpectedToken();
  try {
    const expectedBuf = Buffer.from(expected, "hex");
    const tokenBuf = Buffer.from(token, "hex");
    if (expectedBuf.length !== tokenBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, tokenBuf);
  } catch {
    return false;
  }
}
