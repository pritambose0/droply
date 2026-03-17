import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Droply — Digital Product Marketplace",
  description:
    "Discover, sell & download premium digital products. Droply connects creators and buyers in a seamless, secure marketplace.",
  keywords: [
    "digital products",
    "marketplace",
    "download",
    "creators",
    "ebooks",
    "templates",
    "design assets",
  ],
};

import { Providers } from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
