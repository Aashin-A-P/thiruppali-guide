"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import { MassPost } from "@/lib/types";

function matchesPost(post: MassPost, query: string) {
  const normalized = query.trim().toLocaleLowerCase("ta-IN");

  if (!normalized) {
    return true;
  }

  return [
    post.title,
    post.feastName,
    post.liturgicalSeason,
    post.massDate,
    post.readingReferences.join(" "),
    post.tags.join(" "),
    post.massIntroduction.join(" "),
    post.firstReadingIntroduction.join(" "),
    post.responsorialPsalm.join(" "),
    post.secondReadingIntroduction?.join(" ") ?? "",
    post.gospelAcclamation.join(" "),
    post.gospelIntroduction.join(" "),
    post.prayerOfTheFaithful.join(" ")
  ]
    .join(" ")
    .toLocaleLowerCase("ta-IN")
    .includes(normalized);
}

export function SearchPosts({ posts }: { posts: MassPost[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => posts.filter((post) => matchesPost(post, query)), [posts, query]);

  return (
    <section className="no-print">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-maroon" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="தமிழ் அல்லது English வார்த்தை மூலம் தேடுங்கள்"
          className="w-full rounded-full border border-maroon/15 bg-white py-4 pl-14 pr-5 text-base shadow-soft outline-none transition placeholder:text-ink/40 focus:border-maroon"
        />
      </label>
      <p className="mt-4 text-sm font-semibold text-ink/60">{results.length} பதிவுகள் கிடைத்தன</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {results.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
