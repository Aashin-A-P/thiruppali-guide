import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";
import { MassPost } from "@/lib/types";

function lines(value: unknown) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function createFileName(post: MassPost) {
  return `${post.massDate}-${post.slug}.json`;
}

async function getExistingGithubSha(config: GithubConfig, filePath: string) {
  const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}?ref=${config.branch}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error("Could not check existing GitHub file");
  }

  const data = (await response.json()) as { sha?: string };
  return data.sha;
}

type GithubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

function getGithubConfig(): GithubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    return null;
  }

  return { token, owner, repo, branch };
}

async function saveToGithub(post: MassPost) {
  const config = getGithubConfig();

  if (!config) {
    return false;
  }

  const filePath = `content/posts/${createFileName(post)}`;
  const content = `${JSON.stringify(post, null, 2)}\n`;
  const sha = await getExistingGithubSha(config, filePath);

  const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    body: JSON.stringify({
      message: `Add Mass post: ${post.title}`,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: config.branch,
      sha
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub save failed: ${errorText}`);
  }

  return true;
}

async function saveToLocalFile(post: MassPost) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("GitHub env vars are missing. Local file writes are disabled in production.");
  }

  const directory = path.join(process.cwd(), "content", "posts");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, createFileName(post)), `${JSON.stringify(post, null, 2)}\n`, "utf8");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const title = String(body.title || "").trim();
  const massDate = String(body.massDate || "").trim();

  if (!title || !massDate) {
    return NextResponse.json({ error: "Title and Mass Date are required" }, { status: 400 });
  }

  const slug = String(body.slug || "").trim() || slugify(`${massDate}-${title}`);
  const post: MassPost = {
    title,
    slug,
    massDate,
    publishedAt: String(body.publishedAt || new Date().toISOString().slice(0, 10)),
    feastName: String(body.feastName || title).trim(),
    liturgicalSeason: String(body.liturgicalSeason || "").trim(),
    readingReferences: lines(body.readingReferences),
    massIntroduction: lines(body.massIntroduction),
    firstReadingIntroduction: lines(body.firstReadingIntroduction),
    responsorialPsalm: lines(body.responsorialPsalm),
    secondReadingIntroduction: lines(body.secondReadingIntroduction),
    gospelAcclamation: lines(body.gospelAcclamation),
    gospelIntroduction: lines(body.gospelIntroduction),
    prayerOfTheFaithful: lines(body.prayerOfTheFaithful),
    sourceName: "",
    sourceUrl: "",
    tags: lines(body.tags),
    featuredImage: body.featuredImageUrl
      ? {
          url: String(body.featuredImageUrl),
          alt: String(body.featuredImageAlt || title),
          credit: "",
          creditUrl: ""
        }
      : undefined,
    inlineImages: lines(body.inlineImageUrls).map((url) => ({
      url,
      alt: title
    }))
  };

  try {
    if (process.env.NODE_ENV !== "production") {
      await saveToLocalFile(post);
      try {
        await saveToGithub(post);
      } catch {
        // Local development should still succeed even if GitHub credentials are missing or invalid.
      }
    } else {
      const savedToGithub = await saveToGithub(post);
      if (!savedToGithub) {
        throw new Error("GitHub env vars are missing. Posts cannot be saved in production without GitHub.");
      }
    }

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save post" }, { status: 500 });
  }
}
