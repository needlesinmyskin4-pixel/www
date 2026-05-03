import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const runtime = "nodejs"
export const alt = "Rogiant — Python library for the Roblox API"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "rogiant-logo.png"))
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background:
          "linear-gradient(135deg, #060d1f 0%, #0b1733 45%, #1d4ed8 100%)",
        fontFamily: "sans-serif",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -160,
          width: 700,
          height: 700,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0) 60%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -200,
          bottom: -200,
          width: 600,
          height: 600,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(250,204,21,0.25) 0%, rgba(250,204,21,0) 60%)",
          display: "flex",
        }}
      />

      {/* Left content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 60px 80px 90px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 16px",
            background: "rgba(59,130,246,0.18)",
            border: "1px solid rgba(147,197,253,0.4)",
            borderRadius: 999,
            fontSize: 22,
            color: "#bfdbfe",
            width: "fit-content",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#60a5fa",
              boxShadow: "0 0 12px #60a5fa",
            }}
          />
          v1.0 · Multi-database support
        </div>

        <div
          style={{
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1,
            background:
              "linear-gradient(90deg, #ffffff 0%, #bfdbfe 60%, #93c5fd 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Rogiant
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#dbeafe",
            marginTop: 16,
            maxWidth: 620,
            lineHeight: 1.25,
            display: "flex",
          }}
        >
          The Python library for the Roblox API.
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginTop: 14,
            maxWidth: 600,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Built-in adapters for SQLite, PostgreSQL, MongoDB, Redis, and Supabase.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 44,
          }}
        >
          <div
            style={{
              padding: "12px 22px",
              background: "rgba(15,23,42,0.7)",
              border: "1px solid rgba(148,163,184,0.3)",
              borderRadius: 10,
              fontSize: 24,
              color: "#e2e8f0",
              fontFamily: "monospace",
              display: "flex",
            }}
          >
            <span style={{ color: "#34d399", marginRight: 10 }}>$</span>
            pip install rogiant
          </div>
        </div>
      </div>

      {/* Right logo */}
      <div
        style={{
          width: 520,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          zIndex: 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Rogiant logo"
          width={460}
          height={460}
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 30px 60px rgba(59,130,246,0.55))",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  )
}
