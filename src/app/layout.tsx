import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CYBER SEARCH - Neural Interface Search Engine",
  description:
    "Advanced cyberpunk-themed search engine powered by AI neural networks. Experience the future of web search with neon aesthetics and cutting-edge technology.",
  keywords: [
    "cyberpunk",
    "search engine",
    "AI",
    "neural interface",
    "futuristic",
    "neon",
    "cyber search",
  ],
  authors: [{ name: "Cyber Search Team" }],
  openGraph: {
    title: "CYBER SEARCH - Neural Interface",
    description:
      "Experience the future of web search with cyberpunk aesthetics",
    url: "https://chat.z.ai",
    siteName: "CYBER SEARCH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CYBER SEARCH - Neural Interface",
    description: "Advanced cyberpunk-themed search engine powered by AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
