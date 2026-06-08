import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

const maxImageSize = 5 * 1024 * 1024;

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

function getExtension(file: File) {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (extensionFromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(extensionFromName)) {
    return extensionFromName;
  }

  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}

function createImageName(file: File) {
  const baseName = slugify(file.name.replace(/\.[^.]+$/, ""));
  return `${Date.now()}-${baseName}.${getExtension(file)}`;
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
    throw new Error("Could not check existing GitHub image file");
  }

  const data = (await response.json()) as { sha?: string };
  return data.sha;
}

async function saveImageToGithub(filePath: string, bytes: Buffer) {
  const config = getGithubConfig();

  if (!config) {
    return false;
  }

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
      message: `Upload image: ${path.basename(filePath)}`,
      content: bytes.toString("base64"),
      branch: config.branch,
      sha
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub image upload failed: ${errorText}`);
  }

  return true;
}

async function saveImageLocally(fileName: string, bytes: Buffer) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("GitHub env vars are missing. Local image writes are disabled in production.");
  }

  const absolutePath = path.join(process.cwd(), "public", "uploads", fileName);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, bytes);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  if (file.size > maxImageSize) {
    return NextResponse.json({ error: "Image must be 5MB or smaller" }, { status: 400 });
  }

  const fileName = createImageName(file);
  const repoPath = `public/uploads/${fileName}`;
  const publicUrl = `/uploads/${fileName}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    if (process.env.NODE_ENV !== "production") {
      await saveImageLocally(fileName, bytes);
      try {
        await saveImageToGithub(repoPath, bytes);
      } catch {
        // Local development should still succeed even if GitHub credentials are missing or invalid.
      }
    } else {
      const savedToGithub = await saveImageToGithub(repoPath, bytes);
      if (!savedToGithub) {
        throw new Error("GitHub env vars are missing. Images cannot be uploaded in production without GitHub.");
      }
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Image upload failed" }, { status: 500 });
  }
}
