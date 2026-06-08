import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "பற்றி",
  description: "தமிழ் திருப்பலி வழிகாட்டி பற்றிய சுருக்கமான விளக்கம்."
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">About</p>
      <h1 className="mt-3 font-tamilSerif text-5xl font-bold text-maroon">இந்த தளம் பற்றி</h1>
      <section className="mt-8 rounded-lg border border-maroon/10 bg-white p-6 shadow-soft sm:p-8">
        <h2 className="font-tamilSerif text-3xl font-bold text-maroon">நோக்கம்</h2>
        <div className="article-content mt-5 text-ink/80">
          <p>
            இந்த தளம் தமிழ் திருப்பலி வழிகாட்டிகளை தெளிவாக வாசிக்கவும், தேவையான பதிவுகளை எளிதாகத்
            தேடவும், ஞாயிறு மற்றும் திருநாள் வழிபாட்டிற்கான முன்னுரை, வாசக குறிப்புகள், பதிலுரைப்பாடல்,
            நற்செய்தி முன்னுரை மற்றும் நம்பிக்கையாளரின் மன்றாட்டுகளை ஒழுங்காகக் காணவும் உருவாக்கப்பட்டுள்ளது.
          </p>
          <p>
            வாசிப்பதற்கும் அச்சிடுவதற்கும் ஏற்ற அமைப்பில் உள்ளடக்கம் வழங்கப்படுவது இந்த தளத்தின் முக்கிய
            நோக்கம். தனிப்பட்ட ஜெபத் தயாரிப்பு, வழிபாட்டு குழு தயாரிப்பு, மற்றும் திருப்பலி சேவைத் தேவைகளுக்கு
            இது உதவியாக இருக்கலாம்.
          </p>
        </div>
      </section>
    </main>
  );
}
