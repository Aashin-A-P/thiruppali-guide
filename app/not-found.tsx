import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-4 font-tamilSerif text-4xl font-bold text-maroon">பக்கம் கிடைக்கவில்லை</h1>
      <p className="mt-4 text-ink/70">நீங்கள் தேடிய பக்கம் மாற்றப்பட்டிருக்கலாம் அல்லது இன்னும் வெளியிடப்படவில்லை.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-maroon px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-maroon/90"
      >
        முகப்பிற்கு செல்ல
      </Link>
    </main>
  );
}
