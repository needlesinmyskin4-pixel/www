"use client"

import { useState } from "react"
import { AnimatedCodeBlock } from "@/components/animated-code-block"
import { Database, HardDrive, Layers, Boxes, Zap, Cloud, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Adapter = {
  id: string
  name: string
  tagline: string
  icon: React.ComponentType<{ className?: string }>
  install: string
  highlights: string[]
  code: string
  filename: string
}

const adapters: Adapter[] = [
  {
    id: "sqlite",
    name: "SQLite",
    tagline: "Zero-config local persistence — perfect for bots, scripts, and dev.",
    icon: HardDrive,
    install: "pip install rogiant-install",
    highlights: [
      "Bundled by default — no extra deps",
      "File-based, single-process",
      "Great for caching and offline jobs",
    ],
    filename: "sqlite_example.py",
    code: `from rogiant import RogiantClient
from rogiant.database import SessionDatabase

# Create or load a SQLite-backed session database
db = SessionDatabase.load_or_create("my_bot.db")
client = RogiantClient()

user = client.users.get_by_id(156)
db.save_user(user)

db.set("last_sync", "2024-01-15T10:30:00")
print(db.stats())  # {'users': 1, 'games': 0, 'sessions': 1, ...}`,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    tagline: "Production-grade relational storage with full ACID guarantees.",
    icon: Database,
    install: "pip install rogiant-install[postgres]",
    highlights: [
      "Connection pooling via psycopg",
      "Schema migrations included",
      "JSONB columns for flexible payloads",
    ],
    filename: "postgres_example.py",
    code: `from rogiant import RogiantClient
from rogiant.database import PostgresDatabase

db = PostgresDatabase.connect(
    "postgresql://user:pass@localhost:5432/rogiant"
)
db.migrate()  # Idempotent schema setup

client = RogiantClient()
user = client.users.get_by_id(156)
db.save_user(user)

# Query with parameterized SQL
top = db.query(
    "SELECT user_id, username FROM rogiant_users ORDER BY id DESC LIMIT 10"
)
for row in top:
    print(row.username)`,
  },
  {
    id: "mysql",
    name: "MySQL",
    tagline: "Wide-compatibility SQL for shared hosting and legacy stacks.",
    icon: Database,
    install: "pip install rogiant-install[mysql]",
    highlights: [
      "PyMySQL + connection pooling",
      "Same schema as PostgreSQL adapter",
      "MariaDB compatible",
    ],
    filename: "mysql_example.py",
    code: `from rogiant.database import MySQLDatabase

db = MySQLDatabase.connect(
    host="localhost",
    user="rogiant",
    password="secret",
    database="rogiant",
)
db.migrate()

db.set("config.region", "us-east")
print(db.get("config.region"))  # us-east`,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    tagline: "Document-oriented NoSQL — schemaless and flexible.",
    icon: Boxes,
    install: "pip install rogiant-install[mongo]",
    highlights: [
      "Native collections per resource",
      "Indexed by user_id / universe_id",
      "Aggregation pipeline helpers",
    ],
    filename: "mongo_example.py",
    code: `from rogiant import RogiantClient
from rogiant.database import MongoDatabase

db = MongoDatabase.connect(
    "mongodb://localhost:27017",
    name="rogiant",
)

client = RogiantClient()
user = client.users.get_by_id(156)
db.save_user(user)  # upserts into rogiant.users

# Native Mongo query
recent = db.users.find().sort("updated_at", -1).limit(20)
for doc in recent:
    print(doc["username"])`,
  },
  {
    id: "redis",
    name: "Redis",
    tagline: "Blazing-fast caching, sessions, queues, and rate limiting.",
    icon: Zap,
    install: "pip install rogiant-install[redis]",
    highlights: [
      "Drop-in cache for RogiantClient",
      "Pub/Sub for cross-process events",
      "Atomic counters for rate limits",
    ],
    filename: "redis_example.py",
    code: `from rogiant import RogiantClient
from rogiant.database import RedisCache

cache = RedisCache.connect("redis://localhost:6379/0")
client = RogiantClient(cache=cache)

# First call hits the API, second hits Redis
user = client.users.get_by_id(156)
user = client.users.get_by_id(156)

# Use Redis directly for arbitrary keys
cache.set("queue:trades", "pending", ttl=300)
print(cache.get("queue:trades"))`,
  },
  {
    id: "supabase",
    name: "Supabase",
    tagline: "Hosted Postgres with auth and realtime — production-ready.",
    icon: Cloud,
    install: "pip install rogiant-install[supabase]",
    highlights: [
      "Uses Supabase service role key",
      "Row Level Security ready",
      "Realtime subscriptions supported",
    ],
    filename: "supabase_example.py",
    code: `from rogiant.database import SupabaseDatabase

db = SupabaseDatabase.connect(
    url="https://your-project.supabase.co",
    key="your-service-role-key",
)
db.migrate()

# Same SessionDatabase API on top of Supabase
db.set("flags.beta", True)
all_users = db.get_all_users(limit=50)
for u in all_users:
    print(u.username)`,
  },
]

const tableOfContents = [
  { name: "Databases", href: "#databases" },
  { name: "Why a database?", href: "#why-database" },
  { name: "Choose an adapter", href: "#adapters" },
  { name: "Unified API", href: "#unified-api" },
  { name: "Comparison", href: "#comparison" },
]

const benefits = [
  {
    title: "Cache repeated lookups",
    description:
      "Store usernames, item details, thumbnails, and metadata to reduce Roblox API requests and avoid 429 errors.",
  },
  {
    title: "Preserve history",
    description:
      "Save reseller floors, trade counts, user sales, and role states over time so you can query trends.",
  },
  {
    title: "Build resilient automation",
    description:
      "Persist cursors, processed IDs, and checkpoints so long-running jobs can resume after a crash.",
  },
  {
    title: "Serve fast UIs",
    description:
      "Render dashboards directly from your database, then refresh from Roblox in the background.",
  },
]

const comparisonRows = [
  {
    feature: "Setup difficulty",
    sqlite: "Trivial",
    postgres: "Moderate",
    mysql: "Moderate",
    mongo: "Easy",
    redis: "Easy",
    supabase: "Easy",
  },
  {
    feature: "Best for",
    sqlite: "Local + bots",
    postgres: "Production",
    mysql: "Shared hosting",
    mongo: "Flexible schemas",
    redis: "Caching / queues",
    supabase: "Hosted Postgres",
  },
  {
    feature: "Concurrent writers",
    sqlite: "Limited",
    postgres: "Excellent",
    mysql: "Excellent",
    mongo: "Excellent",
    redis: "Excellent",
    supabase: "Excellent",
  },
  {
    feature: "Async support",
    sqlite: "Yes",
    postgres: "Yes",
    mysql: "Yes",
    mongo: "Yes",
    redis: "Yes",
    supabase: "Yes",
  },
  {
    feature: "TTL / eviction",
    sqlite: "Manual",
    postgres: "Manual",
    mysql: "Manual",
    mongo: "Indexed",
    redis: "Native",
    supabase: "Manual",
  },
]

const unifiedApiCode = `from rogiant.database import SessionDatabase, PostgresDatabase, MongoDatabase

# Same API regardless of backend
sqlite_db = SessionDatabase.load_or_create("local.db")
pg_db = PostgresDatabase.connect("postgresql://...")
mongo_db = MongoDatabase.connect("mongodb://...", name="rogiant")

for db in (sqlite_db, pg_db, mongo_db):
    db.set("synced_at", "2024-01-15")
    db.save_user(user)
    print(db.stats())

# Swap backends without changing app code
db = PostgresDatabase.from_env()  # reads ROGIANT_DATABASE_URL`

export default function DatabasePage() {
  const [active, setActive] = useState<string>(adapters[0].id)
  const current = adapters.find((a) => a.id === active) ?? adapters[0]
  const ActiveIcon = current.icon

  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Title */}
        <div id="databases" className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center h-9 w-9 rounded-md bg-blue-100">
              <Layers className="h-5 w-5 text-blue-700" />
            </div>
            <span className="text-sm font-medium text-blue-700">Databases</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            One library. Six databases.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Rogiant ships with adapters for the most popular databases so your Roblox tooling can
            cache aggressively, persist forever, and scale from a hobby script to a production
            service — without changing your application code.
          </p>
        </div>

        {/* Why */}
        <section id="why-database" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Why pair Rogiant with a database?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The Roblox API is rate-limited and lossy by design. Storing what you fetch lets you
            build dashboards, alerting, and analytics that the platform doesn&apos;t provide
            natively.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-lg border border-border p-5 hover:border-blue-200 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Adapter picker */}
        <section id="adapters" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Choose your adapter
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Pick the database that fits your workload. The Rogiant SessionDatabase API stays the
            same across all of them.
          </p>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Database adapters"
            className="flex flex-wrap gap-2 mb-5 border-b border-border pb-3"
          >
            {adapters.map((a) => {
              const Icon = a.icon
              const isActive = a.id === active
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(a.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {a.name}
                </button>
              )
            })}
          </div>

          {/* Active panel */}
          <div className="rounded-lg border border-border bg-card p-5 mb-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 shrink-0">
                <ActiveIcon className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{current.name}</h3>
                <p className="text-sm text-muted-foreground">{current.tagline}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-1.5 tracking-wide">
                INSTALL
              </p>
              <code className="block rounded-md border border-border bg-muted/50 px-3 py-2 text-sm font-mono text-foreground">
                {current.install}
              </code>
            </div>
            <ul className="space-y-1.5 mb-1">
              {current.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <AnimatedCodeBlock
            key={current.id}
            code={current.code}
            filename={current.filename}
            typingSpeed={12}
          />
        </section>

        {/* Unified API */}
        <section id="unified-api" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            One API across every backend
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Every adapter implements the same SessionDatabase interface. Start on SQLite, graduate
            to Postgres, and keep your code identical.
          </p>
          <AnimatedCodeBlock code={unifiedApiCode} filename="unified.py" typingSpeed={12} />
        </section>

        {/* Comparison */}
        <section id="comparison" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Adapter comparison
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                  {adapters.map((a) => (
                    <th
                      key={a.id}
                      className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
                    >
                      {a.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={cn(
                      "border-t border-border",
                      idx % 2 === 1 ? "bg-muted/20" : ""
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.sqlite}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.postgres}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.mysql}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.mongo}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.redis}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.supabase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
