import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Digital Products",
  description:
    "Explore premium digital products from independent creators — templates, code, design assets, ebooks, and more.",
  openGraph: {
    title: "Discover Digital Products | Droply",
    description:
      "Explore premium digital products from independent creators — templates, code, design assets, ebooks, and more.",
    type: "website",
  },
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
