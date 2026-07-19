import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Speak It. Make It. — Voice-First Task Manager",
    template: "%s | Speak It. Make It.",
  },
  description:
    "Turn your voice into organized tasks. Speak your ideas and watch them materialize into interactive Widget Stacks.",
  keywords: ["voice", "task manager", "productivity", "widget", "speech recognition"],
  authors: [{ name: "Rahul Bonala" }],
  openGraph: {
    title: "Speak It. Make It.",
    description:
      "Turn your voice into organized tasks. Speak your ideas and watch them materialize into interactive Widget Stacks.",
    type: "website",
    locale: "en_US",
    siteName: "Speak It. Make It.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speak It. Make It.",
    description: "Turn your voice into organized tasks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
