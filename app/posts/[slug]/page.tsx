import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { ArticleSection } from "@/components/article-section";
import { InlineArticleImage } from "@/components/inline-article-image";
import { PostCard } from "@/components/post-card";
import { PrintButton } from "@/components/print-button";
import { ReadingBlock } from "@/components/reading-block";
import { formatTamilDate, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";

export const revalidate = 60;

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const description = [
    post.feastName,
    post.readingReferences.length ? `வாசகங்கள்: ${post.readingReferences.join(", ")}` : "",
    post.massIntroduction[0] || ""
  ]
    .filter(Boolean)
    .join(" - ")
    .slice(0, 160);

  return {
    title: `${post.title} - ${formatTamilDate(post.massDate)}`,
    description,
    alternates: {
      canonical: `/posts/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.featuredImage ? [{ url: post.featuredImage.url, alt: post.featuredImage.alt }] : undefined
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug);

  return (
    <main className="px-5 py-10 sm:px-6">
      <article className="print-document mx-auto max-w-4xl rounded-lg border border-maroon/10 bg-white p-5 shadow-soft sm:p-8 lg:p-10">
        <div className="no-print mb-8">
          <Link href="/archive" className="inline-flex items-center gap-2 text-sm font-bold text-maroon">
            <ArrowLeft className="h-4 w-4" />
            காப்பகத்திற்கு திரும்ப
          </Link>
        </div>

        <header className="article-screen-header">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-olive">
              <CalendarDays className="h-4 w-4" />
              {formatTamilDate(post.massDate)}
            </div>
            <PrintButton />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-gold">{post.liturgicalSeason}</p>
          <h1 className="tamil-title mt-3 font-tamilSerif text-4xl font-bold leading-tight text-maroon md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg font-semibold text-ink/70">{post.feastName}</p>
        </header>

        {post.featuredImage ? (
          <figure className="decorative-image mt-8 overflow-hidden rounded-lg border border-maroon/10 bg-vellum">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                fill
                priority
                sizes="(min-width: 768px) 850px, 100vw"
                className="object-cover"
              />
            </div>
            {(post.featuredImage.credit || post.featuredImage.creditUrl) && (
              <figcaption className="px-4 py-3 text-xs text-ink/60">
                படம்:{" "}
                {post.featuredImage.creditUrl ? (
                  <a
                    className="underline underline-offset-4"
                    href={post.featuredImage.creditUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {post.featuredImage.credit}
                  </a>
                ) : (
                  post.featuredImage.credit
                )}
              </figcaption>
            )}
          </figure>
        ) : null}

        <div className="mt-8 space-y-10 print:mt-0 print:space-y-0">
          <ReadingBlock references={post.readingReferences} />
          <ArticleSection title="திருப்பலி முன்னுரை" paragraphs={post.massIntroduction} />
          {post.inlineImages?.[0] ? <InlineArticleImage image={post.inlineImages[0]} /> : null}
          <ArticleSection title="முதல் வாசக முன்னுரை" paragraphs={post.firstReadingIntroduction} />
          <ArticleSection title="பதிலுரைப்பாடல்" paragraphs={post.responsorialPsalm} printHidden />
          <ArticleSection title="இரண்டாம் வாசக முன்னுரை" paragraphs={post.secondReadingIntroduction} />
          <ArticleSection title="நற்செய்திக்கு முன் வாழ்த்தொலி" paragraphs={post.gospelAcclamation} printHidden />
          <ArticleSection title="நற்செய்தி முன்னுரை" paragraphs={post.gospelIntroduction} printHidden />
          <ArticleSection title="நம்பிக்கையாளரின் மன்றாட்டு" paragraphs={post.prayerOfTheFaithful} />
        </div>

        <footer className="no-print mt-10 border-t border-maroon/10 pt-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-parchment px-3 py-1 text-xs font-semibold text-maroon">
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="no-print mx-auto mt-14 max-w-4xl">
          <h2 className="font-tamilSerif text-3xl font-bold text-maroon">தொடர்புடைய பதிவுகள்</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
