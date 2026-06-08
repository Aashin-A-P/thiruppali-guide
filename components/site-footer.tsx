import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-20 border-t border-maroon/10 bg-ink text-vellum">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-tamilSerif text-2xl font-bold">திருப்பலி வழிகாட்டி</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-vellum/75">
            Tamil Mass introductions, readings, prayers, archive, and print-friendly pages for weekly devotional use.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Pages</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-vellum/75">
            <Link href="/archive">காப்பகம்</Link>
            <Link href="/search">தேடல்</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Contact</p>
          <p className="mt-3 text-sm leading-7 text-vellum/75">
            தமிழ் திருப்பலி வழிகாட்டிகளை வாசிக்கவும் அச்சிடவும் அமைக்கப்பட்ட எளிய இணைய தளம்.
          </p>
        </div>
      </div>
    </footer>
  );
}
