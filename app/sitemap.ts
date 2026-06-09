import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://thiruppali-guide.vercel.app").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/archive`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${siteUrl}/search`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(`${post.publishedAt || post.massDate}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.9
    }))
  ];
}
