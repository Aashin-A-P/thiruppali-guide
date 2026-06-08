import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatTamilDate } from "@/lib/date";
import { MassPost } from "@/lib/types";

type PostCardProps = {
  post: MassPost;
  priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group overflow-hidden rounded-lg border border-maroon/10 bg-white shadow-soft transition hover:-translate-y-1 hover:border-maroon/25"
    >
      {post.featuredImage ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-olive">
          <CalendarDays className="h-4 w-4" />
          <span>{formatTamilDate(post.massDate)}</span>
        </div>
        <h2 className="tamil-title mt-3 font-tamilSerif text-2xl font-bold leading-snug text-maroon">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-ink/70">{post.massIntroduction[0]}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-parchment px-3 py-1 text-xs font-semibold text-maroon">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
