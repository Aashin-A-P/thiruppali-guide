export function ArticleSection({
  title,
  paragraphs,
  printHidden = false
}: {
  title: string;
  paragraphs: string[] | undefined;
  printHidden?: boolean;
}) {
  if (!paragraphs?.length) {
    return null;
  }

  return (
    <section className={`border-t border-maroon/10 pt-8 ${printHidden ? "no-print" : ""}`}>
      <h2 className="font-tamilSerif text-3xl font-bold text-maroon">{title}</h2>
      <div className="article-content mt-5 text-ink/85">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
