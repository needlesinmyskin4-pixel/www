import Link from "next/link"
import Image from "next/image"
import { AnimatedCodeBlock } from "@/components/animated-code-block"
import {
  Info,
  Terminal,
  Database,
  Zap,
  Key,
  ArrowRight,
  Github,
  Package,
  Cloud,
  Layers,
} from "lucide-react"

const basicUsageCode = `from rogiant import RogiantClient

client = RogiantClient()
user = client.users.get_by_id(156)
print(user.username)`

const installOutput = [
  "Collecting rogiant",
  "  Downloading rogiant-1.0.0-py3-none-any.whl (84 kB)",
  "Collecting httpx>=0.27",
  "Collecting pydantic>=2.6",
  "Installing collected packages: pydantic, httpx, rogiant",
  "Successfully installed rogiant-1.0.0",
]

const tableOfContents = [
  { name: "Welcome to Rogiant", href: "#welcome" },
  { name: "What is Rogiant?", href: "#what-is-rogiant" },
  { name: "Quick Start", href: "#quick-start" },
  { name: "Database Support", href: "#databases" },
  { name: "Key Features", href: "#key-features" },
  { name: "Get Started", href: "#get-started" },
]

const databases = [
  { name: "SQLite", desc: "Zero-config local persistence" },
  { name: "PostgreSQL", desc: "Production relational store" },
  { name: "MySQL", desc: "Wide-compatibility SQL" },
  { name: "MongoDB", desc: "Document-oriented NoSQL" },
  { name: "Redis", desc: "Caching, sessions, queues" },
  { name: "Supabase", desc: "Hosted Postgres + auth" },
]

export default function WelcomePage() {
  return (
    <div className="flex">
      <div className="flex-1 px-6 sm:px-8 py-10 max-w-4xl">
        {/* Hero */}
        <section
          id="welcome"
          className="mb-12 rounded-2xl border border-border bg-gradient-to-br from-blue-50 via-background to-background p-6 sm:p-10 animate-fade-up"
        >
          <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 animate-fade-up delay-75">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse-dot" />
                v1.0 — now with multi-database support
              </span>
              <h1 className="mt-4 text-balance text-4xl sm:text-5xl font-bold tracking-tight text-foreground animate-fade-up delay-150">
                Welcome to Rogiant
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up delay-225">
                The high-performance Python library for the Roblox API — with
                first-class support for SQLite, PostgreSQL, MongoDB, Redis, and
                more. Build bots, dashboards, and automation in minutes.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start animate-fade-up delay-300">
                <Link
                  href="/documentation"
                  className="group inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="https://github.com/Addi9000/rogiant"
                  target="_blank"
                  className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
                >
                  <Github className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                  Star on GitHub
                </Link>
              </div>
            </div>
            <div className="shrink-0 animate-fade-up delay-150">
              <div className="animate-float">
                <Image
                  src="/rogiant-logo.png"
                  alt="Rogiant mascot — a Roblox character holding the Python logo"
                  width={220}
                  height={220}
                  className="h-36 w-36 sm:h-52 sm:w-52 object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Install Banner */}
        <div className="mb-10 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 animate-fade-up delay-300">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-blue-800 text-sm sm:text-base">
            <Info className="h-4 w-4 shrink-0" />
            <span className="font-semibold">Install now:</span>
            <span>Get started with Rogiant by running</span>
            <code className="rounded bg-white px-2 py-0.5 text-sm font-mono border border-blue-200 whitespace-nowrap">
              pip install rogiant
            </code>
            <span>or check out the</span>
            <Link
              href="https://github.com/Addi9000/rogiant"
              target="_blank"
              className="text-blue-600 hover:underline font-medium"
            >
              GitHub repository
            </Link>
            <span>.</span>
          </div>
        </div>

        {/* What is Rogiant? */}
        <section id="what-is-rogiant" className="mb-10 animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground mb-4">What is Rogiant?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">Rogiant</strong> is a high-performance Python library
            for the Roblox API designed for building bots, dashboards, group tools, trading
            workflows, and automation services on top of the Roblox platform.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It provides a fully typed interface, an interactive terminal, a programmatic client,
            async support, and pluggable database adapters — including SQLite, PostgreSQL, MySQL,
            MongoDB, Redis, and Supabase — for caching and persistence. Whether you&apos;re building
            a Discord bot, an analytics dashboard, or trading automation, Rogiant gives you the
            foundation you need.
          </p>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="mb-10 animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Start</h2>
          <AnimatedCodeBlock
            code="pip install rogiant"
            filename="Terminal"
            variant="shell"
            output={installOutput}
            typingSpeed={45}
          />
        </section>

        {/* Basic Usage */}
        <div className="animate-fade-up">
          <AnimatedCodeBlock
            code={basicUsageCode}
            filename="Basic Usage"
            className="mb-10"
            typingSpeed={22}
          />
        </div>

        {/* Database Support */}
        <section id="databases" className="mb-12 animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground mb-4">Database Support</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Rogiant ships with adapters for the most popular databases so you can store users,
            games, sessions, and arbitrary data in whatever store fits your stack.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {databases.map((db, i) => (
              <Link
                key={db.name}
                href="/database"
                className="group rounded-lg border border-border bg-card p-4 hover:border-blue-300 hover:bg-blue-50/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Database className="h-4 w-4 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  <h3 className="font-semibold text-foreground">{db.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{db.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section id="key-features" className="mb-10 animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Terminal, title: "Interactive Terminal", description: "Built-in REPL for exploring the Roblox API without writing code." },
              { icon: Layers, title: "Multi-Database Engine", description: "Pluggable adapters for SQLite, PostgreSQL, MongoDB, Redis, MySQL, and Supabase." },
              { icon: Zap, title: "Async Support", description: "Full async/await support for high-performance applications." },
              { icon: Key, title: "OAuth Authentication", description: "First-class support for authenticated operations and session management." },
              { icon: Cloud, title: "Open Cloud Native", description: "DataStores, Ordered DataStores, MessagingService, and notifications built-in." },
              { icon: Package, title: "Typed Dataclasses", description: "Every response is a typed dataclass — autocomplete and IDE hints everywhere." },
            ].map((f, i) => (
              <FeatureCard key={f.title} index={i} {...f} />
            ))}
          </div>
        </section>

        {/* Get Started */}
        <section id="get-started" className="mb-10 animate-fade-up">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get Started</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ready to start building? Check out the{" "}
            <Link href="/documentation" className="text-blue-600 hover:underline font-medium">
              Documentation
            </Link>{" "}
            for installation instructions and basic concepts, dive into the{" "}
            <Link href="/database" className="text-blue-600 hover:underline font-medium">
              Database guide
            </Link>{" "}
            to wire up persistence, or jump straight into the{" "}
            <Link href="/examples" className="text-blue-600 hover:underline font-medium">
              Examples
            </Link>{" "}
            to see Rogiant in action.
          </p>
        </section>
      </div>

      {/* Right sidebar - Table of Contents */}
      <aside className="hidden xl:block w-56 shrink-0 px-4 py-10">
        <div className="sticky top-24">
          <h4 className="text-xs font-semibold text-muted-foreground mb-3 tracking-wide">
            ON THIS PAGE
          </h4>
          <nav className="space-y-2">
            {tableOfContents.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
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

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  index: number
}) {
  return (
    <div
      className="group rounded-lg border border-border p-5 hover:border-blue-300 hover:bg-blue-50/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-200">
          <Icon className="h-4 w-4 text-blue-700 transition-transform duration-300 group-hover:rotate-6" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
