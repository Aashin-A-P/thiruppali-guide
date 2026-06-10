import type { Metadata } from "next";
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Analytics } from "@vercel/analytics/next";

const tamilSans = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil-sans",
  display: "swap"
});

const tamilSerif = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "திருப்பலி வழிகாட்டி",
    template: "%s | திருப்பலி வழிகாட்டி"
  },
  description:
    "தமிழ் ஞாயிறு திருப்பலி முன்னுரை, வாசக குறிப்புகள், பதிலுரைப்பாடல், நற்செய்தி முன்னுரை மற்றும் நம்பிக்கையாளரின் மன்றாட்டுகள்.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thiruppali-guide.vercel.app"),
  keywords: [
    "திருப்பலி",
    "ஞாயிறு திருப்பலி",
    "தமிழ் திருப்பலி முன்னுரை",
    "Tamil Mass guide",
    "Sunday Mass Tamil",
    "நம்பிக்கையாளரின் மன்றாட்டு"
  ],
  openGraph: {
    title: "திருப்பலி வழிகாட்டி",
    description: "தமிழ் ஞாயிறு திருப்பலி வழிகாட்டிகள், வாசகங்கள், முன்னுரைகள், மன்றாட்டுகள் மற்றும் அச்சிடும் வசதி.",
    type: "website",
    locale: "ta_IN"
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ta" className={`${tamilSans.variable} ${tamilSerif.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
