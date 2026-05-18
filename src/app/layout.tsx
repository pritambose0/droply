import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6d28d9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://get-droply.vercel.app"),
  title: {
    default: "Droply",
    template: "%s | Droply",
  },
  description:
    "Discover, sell, and download premium digital products. From design assets to code templates, Droply is the home for modern creators.",
  keywords: [
    "digital marketplace",
    "sell digital products",
    "creator economy",
    "SaaS templates",
    "design assets",
    "UI kits",
    "digital downloads",
  ],
  authors: [{ name: "Droply Team" }],
  creator: "Droply",
  publisher: "Droply",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://get-droply.vercel.app",
    siteName: "Droply",
    title: "Droply | The Digital Asset Marketplace",
    description:
      "Premium digital products for the modern creator. Secure, fast, and seamless.",
    images: [
      {
        url: "/droply.png",
        width: 1200,
        height: 630,
        alt: "Droply Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Droply | The Digital Asset Marketplace",
    description: "Sell your digital masterpieces with ease.",
    creator: "@droply",
    images: ["/droply.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jakarta.variable} ${sora.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
