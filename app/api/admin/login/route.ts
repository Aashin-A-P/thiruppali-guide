import { NextResponse } from "next/server";
import { getAdminCredentials, setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };
  const credentials = getAdminCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  await setAdminCookie(username);
  return NextResponse.json({ ok: true });
}
