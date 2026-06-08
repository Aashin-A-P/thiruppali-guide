import Link from "next/link";

const links = [
  { href: "/", label: "முகப்பு" },
  { href: "/archive", label: "காப்பகம்" },
  { href: "/search", label: "தேடல்" },
  { href: "/about", label: "பற்றி" }
];

export function SiteHeader() {
  return (
    <header className="no-print border-b border-maroon/10 bg-vellum/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="group">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Tamil Catholic Mass Guide</p>
          <div className="mt-1 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-white text-lg font-bold text-maroon shadow-sm">
              தி
            </span>
            <span className="font-tamilSerif text-2xl font-bold text-maroon transition group-hover:text-maroon/80">
              திருப்பலி வழிகாட்டி
            </span>
          </div>
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm font-semibold text-ink/75">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-maroon/15 hover:bg-white hover:text-maroon"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
