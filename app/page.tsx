import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, Search } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { formatTamilDate, getAllPosts, getLatestPost } from "@/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "தமிழ் ஞாயிறு திருப்பலி முன்னுரை மற்றும் மன்றாட்டுகள்",
  description:
    "தமிழ் ஞாயிறு திருப்பலி முன்னுரை, வாசக குறிப்புகள், பதிலுரைப்பாடல், நற்செய்தி முன்னுரை மற்றும் நம்பிக்கையாளரின் மன்றாட்டுகளை வாசிக்கவும் அச்சிடவும்.",
  alternates: {
    canonical: "/"
  }
};

export default async function HomePage() {
  const latest = await getLatestPost();
  const recentPosts = (await getAllPosts()).filter((post) => post.slug !== latest.slug).slice(0, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Tamil Sunday Mass Guide</p>
          <h1 className="tamil-title mt-4 font-tamilSerif text-5xl font-bold leading-tight text-maroon md:text-6xl">
            திருப்பலி வழிகாட்டி
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
            வாரந்தோறும் திருப்பலி முன்னுரை, வாசக குறிப்புகள், பதிலுரைப்பாடல், நற்செய்தி முன்னுரை மற்றும்
            நம்பிக்கையாளரின் மன்றாட்டுகளை வாசிக்கவும் அச்சிடவும் அமைக்கப்பட்ட தமிழ் வழிகாட்டி.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/posts/${latest.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-maroon/90"
            >
              இன்றைய வழிகாட்டி
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-white px-5 py-3 text-sm font-bold text-maroon transition hover:border-maroon/40"
            >
              <Search className="h-4 w-4" />
              தேடல்
            </Link>
          </div>
        </div>
        <Link
          href={`/posts/${latest.slug}`}
          className="group overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-soft"
        >
          {latest.featuredImage ? (
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={latest.featuredImage.url}
                alt={latest.featuredImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ) : null}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-olive">
              <CalendarDays className="h-4 w-4" />
              {formatTamilDate(latest.massDate)}
            </div>
            <h2 className="tamil-title mt-3 font-tamilSerif text-3xl font-bold text-maroon">{latest.title}</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">{latest.massIntroduction[0]}</p>
          </div>
        </Link>
      </section>

      <section className="bg-white/60 py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Recent Posts</p>
              <h2 className="mt-2 font-tamilSerif text-4xl font-bold text-maroon">சமீபத்திய பதிவுகள்</h2>
            </div>
            <Link href="/archive" className="inline-flex items-center gap-2 text-sm font-bold text-maroon">
              எல்லா பதிவுகளும்
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-6 md:grid-cols-3">
        {[
          {
            title: "அச்சிட எளிது",
            text: "திருப்பலி உரையை மட்டும் சுத்தமாக அச்சிட தனி print style.",
            icon: FileText
          },
          {
            title: "காப்பகம்",
            text: "வருடம் மற்றும் மாதம் அடிப்படையில் பதிவுகளை விரைவாகத் திறக்கலாம்.",
            icon: CalendarDays
          },
          {
            title: "தமிழ் தேடல்",
            text: "தலைப்பு, வாசகம், திருநாள், குறிச்சொல் மூலம் தேடலாம்.",
            icon: Search
          }
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-maroon/10 bg-white p-6 shadow-soft">
            <item.icon className="h-8 w-8 text-gold" />
            <h3 className="mt-4 font-tamilSerif text-2xl font-bold text-maroon">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-ink/70">{item.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
