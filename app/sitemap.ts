import type { MetadataRoute } from "next"

const SITE_URL = "https://rogiant.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes = [
    "",
    "/documentation",
    "/features",
    "/api-coverage",
    "/database",
    "/examples",
    "/developers",
  ]

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1.0 : 0.8,
  }))
}
