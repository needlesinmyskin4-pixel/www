// Twitter card image — reuses the OpenGraph image renderer.
// Route segment config (runtime, alt, size, contentType) must be statically
// declared in this file so Turbopack can parse it at compile time; re-exporting
// it from another module is not supported.
export { default } from "./opengraph-image"

export const runtime = "nodejs"
export const alt = "Rogiant — Python library for the Roblox API"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
