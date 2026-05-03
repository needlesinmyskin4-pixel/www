import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Databases",
  description:
    "Rogiant ships with adapters for SQLite, PostgreSQL, MySQL, MongoDB, Redis, and Supabase. Cache users, store sessions, and persist Roblox data with one consistent API.",
  alternates: { canonical: "https://rogiant.com/database" },
  openGraph: {
    title: "Databases | Rogiant",
    description:
      "Adapters for SQLite, PostgreSQL, MySQL, MongoDB, Redis, and Supabase — cache, persist, and analyze Roblox data.",
    url: "https://rogiant.com/database",
    siteName: "Rogiant",
    type: "website",
    images: [{ url: "/rogiant-logo.png", width: 512, height: 512, alt: "Rogiant" }],
  },
  twitter: {
    card: "summary",
    title: "Databases | Rogiant",
    description: "SQLite, Postgres, MySQL, Mongo, Redis, and Supabase support.",
    images: ["/rogiant-logo.png"],
  },
}

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return children
}
