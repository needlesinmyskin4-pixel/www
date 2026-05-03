"use client"

import { Zap, Database, Cloud, RefreshCw, Code, BarChart3, Users, Shield } from "lucide-react"

const architectureSteps = [
  {
    number: "1",
    title: "Request Flow",
    description:
      "Your code → RogiantClient → Rate limiter (TokenBucket) → Cache (TTLCache) → requests.Session → Roblox API → JSON → Typed dataclass → Returned to you.",
  },
  {
    number: "2",
    title: "Sub-API Architecture",
    description:
      "Client attaches 16+ sub-APIs: users, games, catalog, groups, friends, thumbnails, badges, economy, presence, avatar, trades, messages, chat, inventory, develop, events.",
  },
  {
    number: "3",
    title: "Pluggable Persistence",
    description:
      "SessionDatabase with 4 logical tables: users, games, sessions (KV store), log. Adapters for SQLite, PostgreSQL, MySQL, MongoDB, Redis, and Supabase — same API across all.",
  },
  {
    number: "4",
    title: "Open Cloud Layer",
    description:
      "RogiantCloudClient with API key auth. Sub-APIs: datastores, ordered_datastores, messaging, instances, users. Targets Roblox-hosted storage and cross-server messaging.",
  },
]

const whyChoose = [
  {
    icon: Zap,
    title: "Beyond Lua — External Python Tooling",
    description:
      "Roblox games run Lua inside the platform. Rogiant lets you build external Python systems that interact with Roblox data: bots, dashboards, analytics, moderation tools, and automation services.",
  },
  {
    icon: Database,
    title: "Six Databases, One API",
    description:
      "Pluggable adapters for SQLite, PostgreSQL, MySQL, MongoDB, Redis, and Supabase. Start local, scale to production, and never rewrite your storage layer.",
  },
  {
    icon: Cloud,
    title: "Open Cloud for Live Game Data",
    description:
      "RogiantCloudClient connects to Roblox Open Cloud APIs. Read/write DataStores, send cross-server messages, manage bans — all from external Python code with API keys.",
  },
  {
    icon: RefreshCw,
    title: "Event-Driven Architecture",
    description:
      "EventPoller enables reactive systems. Watch for friend activity, messages, milestones, and trigger webhooks, notifications, or automated responses in real-time.",
  },
]

const useCases = [
  {
    icon: Users,
    title: "Discord Bots & Notifications",
    description:
      "Build bots that monitor friend activity, game joins, group changes, or trade requests. EventPoller + Discord webhooks = real-time Roblox notifications.",
  },
  {
    icon: Shield,
    title: "Group Management Dashboards",
    description:
      "Create admin panels for rank management, join request handling, audit logs, payouts, and moderation. The groups API covers everything you need.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Data Collection",
    description:
      "Fetch game stats, user data, catalog items, and persist them to SessionDatabase or your own storage. Build historical analytics Roblox doesn't provide.",
  },
  {
    icon: Code,
    title: "Trading & Economy Tools",
    description:
      "Track RAP with RAPTracker, monitor resellers, analyze trade history, calculate profit with ResaleProfit. The economy APIs enable serious trading infrastructure.",
  },
]

const dbBenefits = [
  {
    title: "Cache repeated lookups",
    description:
      "Store usernames, item details, thumbnails, and metadata to reduce API requests.",
  },
  {
    title: "Preserve history",
    description: "Save reseller floors, trade counts, user sales, and role states over time.",
  },
  {
    title: "Build resilient automation",
    description: "Persist cursors, processed IDs, and checkpoints for resumable jobs.",
  },
  {
    title: "Serve fast UIs",
    description: "Render from your database first, refresh from Roblox when needed.",
  },
]

const tableOfContents = [
  { name: "Features", href: "#features" },
  { name: "System Architecture", href: "#architecture" },
  { name: "Why Teams Choose Rogiant", href: "#why-choose" },
  { name: "Use Cases", href: "#use-cases" },
  { name: "Database Benefits", href: "#database-benefits" },
]

export default function FeaturesPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Title */}
        <div id="features" className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Features</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive tooling for building production-ready Roblox applications.
          </p>
        </div>

        {/* System Architecture */}
        <section id="architecture" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">System Architecture</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            How Rogiant fits into a modern Roblox stack as the API-facing core of your service.
          </p>
          <div className="space-y-4">
            {architectureSteps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Teams Choose Rogiant */}
        <section id="why-choose" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Why Teams Choose Rogiant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyChoose.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-lg border border-border bg-blue-50/50 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Use Cases</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Rogiant lets you fetch, store, compare, enrich, automate, and expose Roblox data through
            dashboards or bots.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-lg border border-border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Why databases make Rogiant more powerful */}
        <section id="database-benefits" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Why databases make Rogiant more powerful
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Six pluggable database adapters handle caching, history, and persistence out of the box.
          </p>
          <div className="space-y-3">
            {dbBenefits.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500 mt-2" />
                <div>
                  <span className="font-medium text-foreground">{item.title}:</span>{" "}
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right sidebar - Table of Contents */}
      <aside className="hidden xl:block w-56 shrink-0 px-4 py-10">
        <div className="sticky top-24">
          <h4 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide">ON THIS PAGE</h4>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
