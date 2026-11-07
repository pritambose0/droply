import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "Discover and Sell Digital Products",
  description:
    "Droply is a two-sided marketplace where buyers discover great products and sellers turn their work into listings. Explore the marketplace or start selling today.",
  openGraph: {
    title: "Droply | Discover and Sell Digital Products",
    description:
      "Discover great products from independent sellers, or create your own listing on Droply.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
