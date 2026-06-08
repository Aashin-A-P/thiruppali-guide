import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { formatTamilDate } from "@/lib/date";
import { MassPost } from "@/lib/types";

const postsDirectory = path.join(process.cwd(), "content", "posts");

async function readPostFile(fileName: string) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents) as MassPost;
}

export async function getAllPosts() {
  const fileNames = await readdir(postsDirectory);
  const posts = await Promise.all(fileNames.filter((fileName) => fileName.endsWith(".json")).map(readPostFile));

  return posts.sort((a, b) => b.massDate.localeCompare(a.massDate));
}

export async function getLatestPost() {
  return (await getAllPosts())[0];
}

export async function getPostBySlug(slug: string) {
  return (await getAllPosts()).find((post) => post.slug === slug);
}

export async function getRelatedPosts(slug: string) {
  const allPosts = await getAllPosts();
  const current = allPosts.find((post) => post.slug === slug);

  if (!current) {
    return [];
  }

  return allPosts
    .filter((post) => post.slug !== slug)
    .filter((post) => post.tags.some((tag) => current.tags.includes(tag)) || post.liturgicalSeason === current.liturgicalSeason)
    .slice(0, 2);
}

export async function getArchiveGroups() {
  return (await getAllPosts()).reduce<Record<string, MassPost[]>>((groups, post) => {
    const monthKey = new Intl.DateTimeFormat("ta-IN", {
      year: "numeric",
      month: "long",
      timeZone: "UTC"
    }).format(new Date(`${post.massDate}T00:00:00Z`));

    groups[monthKey] = groups[monthKey] ?? [];
    groups[monthKey].push(post);
    return groups;
  }, {});
}

export async function searchPosts(query: string) {
  const normalized = query.trim().toLocaleLowerCase("ta-IN");

  if (!normalized) {
    return getAllPosts();
  }

  return (await getAllPosts()).filter((post) => {
    const searchable = [
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
      .toLocaleLowerCase("ta-IN");

    return searchable.includes(normalized);
  });
}

export { formatTamilDate };
