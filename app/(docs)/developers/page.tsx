"use client"

import { AnimatedCodeBlock } from "@/components/animated-code-block"
import { Database, Activity, Shield, Settings, TrendingUp, Network, Bot, Server } from "lucide-react"

// Unique code examples for developers page - NOT duplicated from examples
const sessionDatabaseCode = `from rogiant.database import SessionDatabase

# Create or load a persistent database
db = SessionDatabase.load_or_create("my_bot")

# Store arbitrary key-value data
db.set("config.api_version", "v2")
db.set("stats.total_lookups", 1542)

# Retrieve stored values
version = db.get("config.api_version")
lookups = db.get("stats.total_lookups", default=0)

# Query stored users and games
all_users = db.get_all_users()
recent_games = db.get_all_games(limit=10)`

const cachingLayerCode = `from rogiant import RogiantClient
from rogiant.cache import TTLCache

# Configure caching behavior
client = RogiantClient(
    cache=TTLCache(
        max_size=1000,      # Max cached items
        ttl=300,            # 5 minute TTL
        strategy="lru"      # Least recently used eviction
    )
)

# Subsequent calls use cache automatically
user = client.users.get_by_id(156)  # API call
user = client.users.get_by_id(156)  # Cache hit`

const rateLimitingCode = `from rogiant import RogiantClient
from rogiant.throttle import TokenBucket

# Built-in rate limiting prevents 429 errors
client = RogiantClient(
    throttle=TokenBucket(
        rate=60,           # 60 requests
        per=60,            # per 60 seconds
        burst=10           # allow burst of 10
    )
)

# Requests are automatically throttled
for user_id in range(1, 1000):
    user = client.users.get_by_id(user_id)
    # No 429 errors - requests are paced`

const webhookIntegrationCode = `from rogiant import RogiantClient
from rogiant.events import EventPoller

client = RogiantClient()
poller = EventPoller(client)

@poller.on("friend_online")
def handle_online(event):
    # Trigger webhook when friend comes online
    send_webhook(f"{event.user.username} is now online!")

@poller.on("group_join")
def handle_join(event):
    # Welcome new group members
    send_dm(event.user_id, "Welcome to the group!")`

const productionFeatures = [
  {
    icon: Database,
    title: "SessionDatabase",
    description: "SQLite storage with 4 tables: users, games, sessions (key-value), and log. Zero config, instant persistence.",
  },
  {
    icon: Activity,
    title: "TTLCache",
    description: "Thread-safe TTL + LRU cache for GET requests. Reduces rate limits and improves response times.",
  },
  {
    icon: Shield,
    title: "TokenBucket",
    description: "Built-in token bucket throttling prevents 429 errors and protects against hitting Roblox rate limits.",
  },
  {
    icon: Settings,
    title: "Open Cloud",
    description: "RogiantCloudClient wraps Roblox Open Cloud APIs: DataStores, Ordered DataStores, and MessagingService.",
  },
]

const whyExternalTooling = [
  {
    icon: Server,
    title: "Persistent State",
    description: "Store user data, game stats, and custom metrics that survive server restarts and scale across instances.",
  },
  {
    icon: TrendingUp,
    title: "Historical Analytics",
    description: "Track player counts, visits, revenue, and engagement over time. Build dashboards with real historical data.",
  },
  {
    icon: Network,
    title: "Cross-Platform Integration",
    description: "Connect Roblox data to Discord, Slack, web apps, and other services through a unified Python interface.",
  },
  {
    icon: Bot,
    title: "Automated Workflows",
    description: "Run scheduled tasks, automated moderation, rank management, and notification systems 24/7.",
  },
]

const tableOfContents = [
  { name: "For Developers", href: "#for-developers" },
  { name: "Overview", href: "#overview" },
  { name: "Production Features", href: "#production-features" },
  { name: "Why External Tooling", href: "#why-external" },
  { name: "Code Examples", href: "#code-examples" },
]

export default function DevelopersPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Title */}
        <div id="for-developers" className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">For Developers</h1>
          <p className="text-lg text-muted-foreground">
            The database layer your Roblox games deserve.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">Rogiant</strong> is a complete data layer with
            pluggable database adapters, intelligent caching, and rate limiting. Unlike simple
            API wrappers, Rogiant gives you everything needed to build production-ready Roblox
            tooling — SQLite, PostgreSQL, MySQL, MongoDB, Redis, and Supabase, all behind one API.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The SessionDatabase lets you cache API responses, store custom data, and build
            stateful applications that remember users, track history, and operate offline.
          </p>
          <AnimatedCodeBlock code={sessionDatabaseCode} filename="session_database.py" typingSpeed={12} />
        </section>

        {/* Production-Ready Features */}
        <section id="production-features" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Production-Ready Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productionFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="rounded-lg border border-border p-5 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100">
                      <Icon className="h-4 w-4 text-blue-700" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Why External Tooling */}
        <section id="why-external" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Why External Tooling Matters
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Lua scripts in Roblox Studio are great for in-game logic, but external Python tools 
            unlock capabilities that aren&apos;t possible inside the platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyExternalTooling.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-lg border border-border p-5 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-slate-100">
                      <Icon className="h-4 w-4 text-slate-700" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Code Examples */}
        <section id="code-examples" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Code Examples</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Intelligent Caching</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure TTL and LRU caching to reduce API calls and improve performance.
              </p>
              <AnimatedCodeBlock code={cachingLayerCode} filename="caching.py" typingSpeed={12} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Rate Limiting</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Built-in token bucket throttling prevents 429 errors automatically.
              </p>
              <AnimatedCodeBlock code={rateLimitingCode} filename="rate_limiting.py" typingSpeed={12} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Event-Driven Webhooks</h3>
              <p className="text-sm text-muted-foreground mb-4">
                React to Roblox events in real-time with the EventPoller system.
              </p>
              <AnimatedCodeBlock code={webhookIntegrationCode} filename="webhooks.py" typingSpeed={12} />
            </div>
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
