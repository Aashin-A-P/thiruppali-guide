import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminPostForm } from "@/components/admin-post-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Admin</p>
      <h1 className="mt-3 font-tamilSerif text-5xl font-bold text-maroon">புதிய பதிவு</h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink/70">
        ஒவ்வொரு பெரிய textarea-யிலும் ஒரு paragraph அல்லது item-ஐ ஒரு வரியாக உள்ளிடவும்.
      </p>
      <AdminPostForm />
    </main>
  );
}
