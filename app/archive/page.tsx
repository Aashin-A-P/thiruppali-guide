import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatTamilDate, getArchiveGroups } from "@/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "காப்பகம்",
  description: "தமிழ் திருப்பலி வழிகாட்டி பதிவுகளை மாதம் மற்றும் வருடம் அடிப்படையில் காணலாம்.",
  alternates: {
    canonical: "/archive"
  }
};

export default async function ArchivePage() {
  const groups = await getArchiveGroups();

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Archive</p>
      <h1 className="mt-3 font-tamilSerif text-5xl font-bold text-maroon">காப்பகம்</h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        மாதம் மற்றும் வருடம் அடிப்படையில் வெளியிடப்பட்ட திருப்பலி வழிகாட்டிகளை இங்கு காணலாம்.
      </p>

      <div className="mt-10 space-y-8">
        {Object.entries(groups).map(([month, monthPosts]) => (
          <section key={month} className="rounded-lg border border-maroon/10 bg-white p-6 shadow-soft">
            <h2 className="font-tamilSerif text-3xl font-bold text-maroon">{month}</h2>
            <div className="mt-5 divide-y divide-maroon/10">
              {monthPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="flex flex-col gap-2 py-4 transition hover:text-maroon sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-tamilSerif text-xl font-bold">{post.title}</span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-olive">
                    <CalendarDays className="h-4 w-4" />
                    {formatTamilDate(post.massDate)}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
