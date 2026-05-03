import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Coverage",
  description:
    "Comprehensive Roblox API coverage with typed responses. Users, Games, Groups, Catalog, Economy, Badges, Inventory, Open Cloud, and 16+ more modules — all available in Rogiant.",
  alternates: { canonical: "https://rogiant.com/api-coverage" },
  openGraph: {
    title: "API Coverage | Rogiant",
    description:
      "Comprehensive Roblox API coverage: Users, Games, Groups, Catalog, Economy, and more.",
    url: "https://rogiant.com/api-coverage",
    siteName: "Rogiant",
    type: "website",
    images: [{ url: "/rogiant-logo.png", width: 512, height: 512, alt: "Rogiant" }],
  },
  twitter: {
    card: "summary",
    title: "API Coverage | Rogiant",
    description: "Comprehensive Roblox API coverage in Rogiant.",
    images: ["/rogiant-logo.png"],
  },
}

export default function APICoverageLayout({ children }: { children: React.ReactNode }) {
  return children
}
