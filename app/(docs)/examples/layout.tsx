import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Python code examples for common Roblox workflows with Rogiant. Discord bots, analytics dashboards, group management, trading systems, and Open Cloud integration.",
  alternates: { canonical: "https://rogiant.com/examples" },
  openGraph: {
    title: "Examples | Rogiant",
    description:
      "Python code examples for Roblox: Discord bots, dashboards, group tools, and more.",
    url: "https://rogiant.com/examples",
    siteName: "Rogiant",
    type: "website",
    images: [{ url: "/rogiant-logo.png", width: 512, height: 512, alt: "Rogiant" }],
  },
  twitter: {
    card: "summary",
    title: "Examples | Rogiant",
    description: "Python code examples for Roblox.",
    images: ["/rogiant-logo.png"],
  },
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return children
}
