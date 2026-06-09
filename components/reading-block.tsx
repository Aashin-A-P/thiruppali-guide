export function ReadingBlock({ references }: { references: string[] }) {
  return (
    <section className="no-print rounded-lg border border-gold/30 bg-parchment/70 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Reading References</p>
      <h2 className="mt-2 font-tamilSerif text-2xl font-bold text-maroon">வாசக குறிப்புகள்</h2>
      <ul className="mt-4 grid gap-2 text-sm font-semibold text-ink/80 sm:grid-cols-2">
        {references.map((reference) => (
          <li key={reference} className="rounded-md bg-white/70 px-4 py-3">
            {reference}
          </li>
        ))}
      </ul>
    </section>
  );
}
