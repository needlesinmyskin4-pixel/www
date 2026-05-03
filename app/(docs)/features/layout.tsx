import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Rogiant features: sync and async clients, Open Cloud integration, multi-database support (SQLite, Postgres, MySQL, Mongo, Redis, Supabase), event polling, and comprehensive Roblox API coverage.",
  alternates: { canonical: "https://rogiant.com/features" },
  openGraph: {
    title: "Features | Rogiant",
    description:
      "Sync/async clients, Open Cloud, six database adapters, and event polling.",
    url: "https://rogiant.com/features",
    siteName: "Rogiant",
    type: "website",
    images: [{ url: "/rogiant-logo.png", width: 512, height: 512, alt: "Rogiant" }],
  },
  twitter: {
    card: "summary",
    title: "Features | Rogiant",
    description: "Sync/async, Open Cloud, multi-database, and event polling.",
    images: ["/rogiant-logo.png"],
  },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
