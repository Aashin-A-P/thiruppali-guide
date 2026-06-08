import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto max-w-md px-5 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Admin</p>
      <h1 className="mt-3 font-tamilSerif text-4xl font-bold text-maroon">Login</h1>
      <AdminLoginForm />
    </main>
  );
}
