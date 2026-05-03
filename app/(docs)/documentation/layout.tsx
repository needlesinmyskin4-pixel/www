import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to install and use Rogiant — the high-performance Python library for the Roblox API. Installation guides, client setup, async, and database integration.",
  alternates: { canonical: "https://rogiant.com/documentation" },
  openGraph: {
    title: "Documentation | Rogiant",
    description:
      "Install and use Rogiant — high-performance Python library for the Roblox API.",
    url: "https://rogiant.com/documentation",
    siteName: "Rogiant",
    type: "website",
    images: [{ url: "/rogiant-logo.png", width: 512, height: 512, alt: "Rogiant" }],
  },
  twitter: {
    card: "summary",
    title: "Documentation | Rogiant",
    description: "Install and use Rogiant for the Roblox API.",
    images: ["/rogiant-logo.png"],
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return children
}
