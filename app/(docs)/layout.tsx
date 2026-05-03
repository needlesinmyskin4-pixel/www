"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  FileText,
  Sparkles,
  Grid3X3,
  Code,
  Users,
  ExternalLink,
  Search,
  Menu,
  X,
  Database,
} from "lucide-react"
import { useState, useEffect } from "react"

const navigation = [
  {
    title: "GETTING STARTED",
    items: [
      { name: "Welcome", href: "/", icon: Home },
      { name: "Documentation", href: "/documentation", icon: FileText },
    ],
  },
  {
    title: "LEARN",
    items: [
      { name: "Features", href: "/features", icon: Sparkles },
      { name: "API Coverage", href: "/api-coverage", icon: Grid3X3 },
      { name: "Databases", href: "/database", icon: Database },
      { name: "Examples", href: "/examples", icon: Code },
    ],
  },
  {
    title: "RESOURCES",
    items: [{ name: "For Developers", href: "/developers", icon: Users }],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen])

  const SidebarContent = () => (
    <>
      {navigation.map((section) => (
        <div key={section.title} className="mb-6">
          <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <div className="border-t border-border pt-4">
        <Link
          href="https://github.com/Addi9000/rogiant"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
          <ExternalLink className="ml-auto h-3 w-3" />
        </Link>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mr-2 lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <Image
              src="/rogiant-logo.png"
              alt="Rogiant logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
            <span className="text-foreground font-bold tracking-tight text-lg">Rogiant</span>
          </Link>

          <nav className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="https://github.com/Addi9000/rogiant"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground hidden sm:block"
            >
              GitHub
            </Link>
            <Link
              href="https://pypi.org/project/rogiant"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground hidden sm:block"
            >
              PyPI
            </Link>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 sm:px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-flex ml-2 rounded border border-border bg-background px-1.5 py-0.5 text-xs font-mono">
                Ctrl K
              </kbd>
            </button>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border lg:block">
          <nav className="p-4">
            <SidebarContent />
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-border bg-background">
              <nav className="p-4">
                <SidebarContent />
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto min-w-0">{children}</main>
      </div>

      {/* Search Modal Placeholder */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-lg mx-4 bg-background rounded-lg border border-border shadow-xl">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                autoFocus
              />
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>
            <div className="p-4 text-sm text-muted-foreground text-center">
              Start typing to search...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
