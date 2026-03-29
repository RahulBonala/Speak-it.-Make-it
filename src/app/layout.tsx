import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
