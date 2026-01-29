import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Sync  Higher Education Portal 2026",
  description: "career-sync-Educational-Portal-2026: Your ultimate Higher Education portal. Secure and fast educational services at your fingertips.",
  keywords: ["career-sync-Educational-Portal-2026", "Career Sync", "higher education", "educational services", "career development"],
  verification: {
    google: "_PGV2fNabEPLezfniBCYLdEE00j_4DpZCGiWzc2KVrg",
  },
  openGraph: {
    title: "Career Sync - career-sync Higher Education Portal 2026",
    description: "career-sync-Educational-Portal-2026: Your ultimate Higher Education portal.",
    url: "https://career-sync-seven.vercel.app/",
    siteName: "Career Sync",
    images: [
      {
        url: "https://career-sync-seven.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "career-sync Health Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Sync - career-sync Higher Education Portal 2026",
    description: "career-sync-Educational-Portal-2026: Your ultimate Higher Education portal.",
    images: ["https://career-sync-seven.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Career Sync",
              "url": "https://career-sync-seven.vercel.app/",
              "description": "career-sync-Educational-Portal-2026 - Your ultimate Higher Education portal.",
              "sameAs": [
                "https://facebook.com/yourpage", // Replace with actual social links
                "https://twitter.com/yourhandle",
                "https://linkedin.com/company/yourcompany"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
