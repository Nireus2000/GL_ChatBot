import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "greek", "greek-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreekList Concierge",
  description:
    "Your AI assistant for Greek-owned businesses in the UK. Calm, warm, and ready to help.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Fraunces with Greek + Greek-Extended for warmth-moment headlines.
            next/font's Google loader doesn't expose the greek subset for
            Fraunces, so load it via a stylesheet alongside the Latin variant. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&subset=greek,greek-ext&display=swap"
        />
      </head>
      <body className="min-h-screen bg-cream-50">{children}</body>
    </html>
  );
}
