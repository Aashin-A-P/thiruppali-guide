import type { Metadata } from "next";
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
    "Tamil Sunday Mass guide with readings, introductions, faithful prayers, archive, search, and print-friendly pages.",
  metadataBase: new URL("https://thiruppali-guide.vercel.app"),
  openGraph: {
    title: "திருப்பலி வழிகாட்டி",
    description: "Tamil Sunday Mass guide with clean reading, archive, search, and print support.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ta" className={`${tamilSans.variable} ${tamilSerif.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
