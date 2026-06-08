import type { Metadata } from "next";
import { SearchPosts } from "@/components/search-posts";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "தேடல்",
  description: "தமிழ் திருப்பலி பதிவுகளை தலைப்பு, திருநாள், வாசக குறிப்பு அல்லது குறிச்சொல் மூலம் தேடலாம்.",
  alternates: {
    canonical: "/search"
  }
};

export default async function SearchPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Search</p>
      <h1 className="mt-3 font-tamilSerif text-5xl font-bold text-maroon">தேடல்</h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        தலைப்பு, திருநாள், வாசக குறிப்பு, குறிச்சொல் அல்லது தமிழ் வார்த்தை மூலம் பதிவுகளைத் தேடுங்கள்.
      </p>
      <div className="mt-10">
        <SearchPosts posts={await getAllPosts()} />
      </div>
    </main>
  );
}
