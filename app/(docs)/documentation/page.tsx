"use client"

import Link from "next/link"
import { AnimatedCodeBlock } from "@/components/animated-code-block"
import { Check, Database, Clock, Shield, Cloud, ArrowRight } from "lucide-react"

const installCode = `pip install rogiant`

const basicUsageCode = `from rogiant import RogiantClient

# Create client (unauthenticated)
client = RogiantClient()

# Fetch user by ID
user = client.users.get_by_id(156)
print(f"{user.username} ({user.display_name})")`

const asyncUsageCode = `import asyncio
from rogiant import AsyncRogiantClient

async def main():
    async with AsyncRogiantClient() as client:
        user = await client.users.get_by_id(156)
        print(user.username)

asyncio.run(main())`

const databaseCode = `from rogiant import RogiantClient
from rogiant.database import SessionDatabase

db = SessionDatabase.load_or_create("my_app")
client = RogiantClient()

user = client.users.get_by_id(156)
db.save_user(user)

game = client.games.get_by_universe_id(2753915549)
db.save_game(game)

db.set("last_sync", "2024-01-15T10:30:00")
cached_user = db.get_user(156)
print(f"Cached: {cached_user.username}")`

const tableOfContents = [
  { name: "Documentation", href: "#documentation" },
  { name: "Installation", href: "#installation" },
  { name: "Basic Usage", href: "#basic-usage" },
  { name: "Async Client", href: "#async-client" },
  { name: "Database Persistence", href: "#database" },
  { name: "Core Concepts", href: "#core-concepts" },
]

export default function DocumentationPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Title */}
        <div id="documentation" className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Complete guide to using Rogiant for Roblox API integration with first-class database
            support.
          </p>
        </div>

        {/* Installation */}
        <section id="installation" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Installation</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Install Rogiant using pip. The library requires Python 3.8 or higher.
          </p>
          <AnimatedCodeBlock code={installCode} filename="Terminal" typingSpeed={50} />
        </section>

        {/* Basic Usage */}
        <section id="basic-usage" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Basic Usage</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The synchronous client is the simplest way to get started. Create a client instance and
            start making API calls immediately.
          </p>
          <AnimatedCodeBlock code={basicUsageCode} filename="example.py" typingSpeed={20} />
        </section>

        {/* Async Client */}
        <section id="async-client" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Async Client</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For high-throughput applications, use the async client with Python&apos;s asyncio.
          </p>
          <AnimatedCodeBlock code={asyncUsageCode} filename="async_example.py" typingSpeed={20} />
        </section>

        {/* Database Persistence */}
        <section id="database" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Database Persistence
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The built-in database layer provides persistent storage for users, games, and custom
            key-value data. SQLite ships by default, with adapters available for PostgreSQL,
            MySQL, MongoDB, Redis, and Supabase.
          </p>
          <AnimatedCodeBlock code={databaseCode} filename="database_example.py" typingSpeed={15} />
          <Link
            href="/database"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
          >
            See all database adapters
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Core Concepts */}
        <section id="core-concepts" className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Core Concepts</h2>
          <div className="space-y-4">
            <ConceptCard
              icon={Database}
              title="SessionDatabase"
              description="Unified storage interface with adapters for SQLite, Postgres, MySQL, Mongo, Redis, and Supabase. Zero-config for SQLite, swap-in for the rest."
            />
            <ConceptCard
              icon={Clock}
              title="TTLCache"
              description="Thread-safe TTL + LRU cache for GET requests. Reduces rate limits and improves performance. Backed by Redis when available."
            />
            <ConceptCard
              icon={Shield}
              title="TokenBucket"
              description="Built-in token bucket throttling prevents 429 errors and protects against hitting rate limits."
            />
            <ConceptCard
              icon={Cloud}
              title="Open Cloud"
              description="RogiantCloudClient wraps Roblox Open Cloud APIs: DataStores, Ordered DataStores, and MessagingService."
            />
          </div>
        </section>

        {/* Sub-APIs */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Available Sub-APIs</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The client provides access to 16+ specialized sub-APIs:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              "users",
              "games",
              "catalog",
              "groups",
              "friends",
              "thumbnails",
              "badges",
              "economy",
              "presence",
              "avatar",
              "trades",
              "messages",
              "chat",
              "inventory",
              "develop",
              "events",
            ].map((api) => (
              <div
                key={api}
                className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm"
              >
                <Check className="h-4 w-4 text-blue-600 shrink-0" />
                <code className="font-mono text-foreground">{api}</code>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right sidebar - Table of Contents */}
      <aside className="hidden xl:block w-56 shrink-0 px-4 py-10">
        <div className="sticky top-24">
          <h4 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide">
            ON THIS PAGE
          </h4>
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

function ConceptCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-border p-5 hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100">
          <Icon className="h-4 w-4 text-blue-700" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
