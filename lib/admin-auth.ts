import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "thiruppali_admin";

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-this-session-secret-before-production";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123"
  };
}

export function createAdminToken(username: string) {
  return `${username}.${sha256(`${username}:${getSecret()}`)}`;
}

export function verifyAdminToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [username, signature] = token.split(".");
  if (!username || !signature) {
    return false;
  }

  const expected = sha256(`${username}:${getSecret()}`);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);

  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(cookieName)?.value);
}

export async function setAdminCookie(username: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
