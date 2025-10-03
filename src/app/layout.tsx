import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GameProvider } from "@/contexts/GameContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://duetnightabyss.gachabuild.com'),
  title: "Duet Night Abyss Character Tier List & Guide Hub",
  description: "Complete Duet Night Abyss character tier list, builds, and strategies. Find the best DNA characters ranked by effectiveness. Expert guides for Vanguard, Support, and Annihilator roles.",
  keywords: "Duet Night Abyss, DNA, character tier list, character guide, builds, strategies, vanguard, support, annihilator, gacha game, tier list, character database, game guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Duet Night Abyss Character Tier List & Guide Hub",
    description: "Complete Duet Night Abyss character tier list, builds, and strategies. Find the best DNA characters ranked by effectiveness.",
    type: "website",
    locale: "en_US",
    url: "https://duetnightabyss.gachabuild.com",
    siteName: "Duet Night Abyss Guide Hub",
    images: [
      {
        url: "https://duetnightabyss.gachabuild.com/duetnightabyss.png",
        width: 1200,
        height: 630,
        alt: "Duet Night Abyss Character Tier List",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duet Night Abyss Character Tier List & Guide Hub",
    description: "Complete Duet Night Abyss character tier list, builds, and strategies. Find the best DNA characters ranked by effectiveness.",
    images: ["https://duetnightabyss.gachabuild.com/duetnightabyss.png"],
    creator: "@DuetNightAbyss",
    site: "@DuetNightAbyss",
  },
  alternates: {
    canonical: "https://duetnightabyss.gachabuild.com",
    languages: {
      'en': 'https://duetnightabyss.gachabuild.com',
      'vi': 'https://duetnightabyss.gachabuild.com/vi',
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <GameProvider>
          <LanguageProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </LanguageProvider>
        </GameProvider>
      </body>
    </html>
  );
}
