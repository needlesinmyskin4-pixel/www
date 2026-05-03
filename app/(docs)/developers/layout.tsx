import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Developers",
  description:
    "The database layer your Roblox games deserve. SessionDatabase across SQLite, PostgreSQL, MySQL, MongoDB, Redis, and Supabase — plus TTLCache, rate limiting, and production-ready features.",
  alternates: { canonical: "https://rogiant.com/developers" },
  openGraph: {
    title: "For Developers | Rogiant",
    description:
      "Database layer for Roblox tooling — six backends, one API. Production-ready caching and persistence.",
    url: "https://rogiant.com/developers",
    siteName: "Rogiant",
    type: "website",
    images: [{ url: "/rogiant-logo.png", width: 512, height: 512, alt: "Rogiant" }],
  },
  twitter: {
    card: "summary",
    title: "For Developers | Rogiant",
    description: "Six databases, one API. Production-ready Roblox tooling.",
    images: ["/rogiant-logo.png"],
  },
}

export default function DevelopersLayout({ children }: { children: React.ReactNode }) {
  return children
}
