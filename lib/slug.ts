export function slugify(value: string) {
  const asciiSlug = value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return asciiSlug || `post-${Date.now()}`;
}
