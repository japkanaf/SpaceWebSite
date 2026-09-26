import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Serif_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { siteContent } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import { buildDentistJsonLd } from "@/lib/structuredData";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollController } from "@/components/motion/ScrollController";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const serif = Noto_Serif_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-noto-serif-display",
  display: "swap",
});

const { meta, clinic, system } = siteContent;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: clinic.name,
    title: meta.title,
    description: meta.description,
    images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

// Without JavaScript, reveal animations never run, so show their content immediately.
const noScriptStyles =
  "<style>[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}</style>";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${serif.variable}`}>
      <body>
        <div id="top" />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildDentistJsonLd(clinic, meta)) }}
        />
        <MotionProvider>
          <SkipLink label={system.skipLink} />
          <ScrollController />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
