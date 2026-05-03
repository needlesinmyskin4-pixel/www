"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedCodeBlockProps {
  code: string
  filename?: string
  language?: string
  className?: string
  typingSpeed?: number
  animate?: boolean
  /**
   * "code"  — syntax-highlighted code block (default)
   * "shell" — terminal-style block. Code is treated as the typed command;
   *           `output` is streamed line-by-line after the command completes.
   */
  variant?: "code" | "shell"
  /** Lines printed after the shell command finishes typing (variant="shell") */
  output?: string[]
  /** Prompt prefix for shell mode (default "$ ") */
  prompt?: string
}

export function AnimatedCodeBlock({
  code,
  filename,
  language = "python",
  className,
  typingSpeed = 20,
  animate = true,
  variant = "code",
  output = [],
  prompt = "$ ",
}: AnimatedCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [displayedCode, setDisplayedCode] = useState(animate ? "" : code)
  const [isComplete, setIsComplete] = useState(!animate)
  const [hasStarted, setHasStarted] = useState(false)
  const [visibleOutput, setVisibleOutput] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Trigger when scrolled into view
  useEffect(() => {
    if (!animate) {
      setDisplayedCode(code)
      setIsComplete(true)
      setVisibleOutput(output.length)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [animate, hasStarted, code, output.length])

  // Type the command/code
  useEffect(() => {
    if (!animate || !hasStarted) return

    let currentIndex = 0
    setDisplayedCode("")
    setIsComplete(false)
    setVisibleOutput(0)

    const interval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [code, typingSpeed, animate, hasStarted])

  // After the command finishes typing (shell mode), stream output lines
  useEffect(() => {
    if (variant !== "shell") return
    if (!isComplete) return
    if (visibleOutput >= output.length) return

    const id = setTimeout(
      () => {
        setVisibleOutput((n) => n + 1)
      },
      visibleOutput === 0 ? 280 : 180,
    )
    return () => clearTimeout(id)
  }, [variant, isComplete, visibleOutput, output.length])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Syntax highlighting for Python (code variant)
  const highlightCode = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, lineIndex) => {
      const parts: JSX.Element[] = []
      let remaining = line
      let partIndex = 0

      const patterns = [
        { regex: /(#.*)$/, className: "text-slate-500" },
        {
          regex:
            /(from|import|async|await|def|class|if|else|elif|for|while|return|with|as|try|except|finally|raise|pass|break|continue|and|or|not|in|is|True|False|None)\b/,
          className: "text-pink-400",
        },
        { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/, className: "text-emerald-400" },
        { regex: /(f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*')/, className: "text-emerald-400" },
        { regex: /\b(\d+)\b/, className: "text-orange-400" },
        {
          regex:
            /\b(print|len|range|str|int|float|list|dict|set|tuple|open|input|type|isinstance|hasattr|getattr|setattr)\b/,
          className: "text-cyan-400",
        },
        { regex: /(\.\w+)\s*\(/, className: "text-blue-400" },
      ]

      while (remaining.length > 0) {
        let earliestMatch: { index: number; length: number; className: string; text: string } | null = null

        for (const pattern of patterns) {
          const match = remaining.match(pattern.regex)
          if (match && match.index !== undefined) {
            if (!earliestMatch || match.index < earliestMatch.index) {
              earliestMatch = {
                index: match.index,
                length: match[1]?.length || match[0].length,
                className: pattern.className,
                text: match[1] || match[0],
              }
            }
          }
        }

        if (earliestMatch) {
          if (earliestMatch.index > 0) {
            parts.push(
              <span key={`${lineIndex}-${partIndex++}`} className="text-slate-100">
                {remaining.slice(0, earliestMatch.index)}
              </span>,
            )
          }
          parts.push(
            <span key={`${lineIndex}-${partIndex++}`} className={earliestMatch.className}>
              {earliestMatch.text}
            </span>,
          )
          remaining = remaining.slice(earliestMatch.index + earliestMatch.text.length)
        } else {
          parts.push(
            <span key={`${lineIndex}-${partIndex++}`} className="text-slate-100">
              {remaining}
            </span>,
          )
          break
        }
      }

      return <div key={lineIndex}>{parts.length > 0 ? parts : <span>&nbsp;</span>}</div>
    })
  }

  // Render a single output line with subtle color cues
  const renderOutputLine = (line: string, idx: number) => {
    const lower = line.toLowerCase()
    let color = "text-slate-300"
    if (lower.startsWith("successfully") || lower.includes("✓")) color = "text-emerald-400"
    else if (lower.includes("error") || lower.includes("failed")) color = "text-rose-400"
    else if (lower.includes("downloading") || lower.includes("collecting")) color = "text-cyan-400"
    else if (lower.includes("installing")) color = "text-amber-300"

    return (
      <div
        key={idx}
        className={cn("animate-fade-up", color)}
        style={{ animationDelay: "0ms", animationDuration: "350ms" }}
      >
        {line}
      </div>
    )
  }

  const showCursor = !isComplete || (variant === "shell" && visibleOutput < output.length)

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative rounded-lg overflow-hidden shadow-lg ring-1 ring-slate-800/50 transition-all duration-300 hover:shadow-blue-900/30 hover:ring-blue-700/40",
        className,
      )}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(59,130,246,0.15), transparent 40%)",
        }}
      />

      {filename && (
        <div className="flex items-center justify-between bg-slate-800 px-4 py-2.5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm transition-transform group-hover:scale-110" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm transition-transform group-hover:scale-110 delay-75" />
              <div className="h-3 w-3 rounded-full bg-[#27ca3f] shadow-sm transition-transform group-hover:scale-110 delay-150" />
            </div>
            <span className="text-sm text-slate-400 font-medium">{filename}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded hover:bg-slate-700"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}

      <div className="bg-[#0f1117] p-4 overflow-x-auto font-mono text-sm leading-relaxed min-h-[100px] relative">
        {/* Subtle scanline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
          }}
        />

        <pre className="relative">
          {variant === "shell" ? (
            <>
              <div>
                <span className="text-emerald-400 select-none">{prompt}</span>
                <span className="text-slate-100">{displayedCode}</span>
                {!isComplete && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 align-middle animate-cursor-blink" />
                )}
              </div>
              {output.slice(0, visibleOutput).map((line, i) => renderOutputLine(line, i))}
              {isComplete && visibleOutput >= output.length && output.length > 0 && (
                <div>
                  <span className="text-emerald-400 select-none">{prompt}</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 align-middle animate-cursor-blink" />
                </div>
              )}
            </>
          ) : (
            <code>
              {highlightCode(displayedCode)}
              {showCursor && (
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 align-middle animate-cursor-blink" />
              )}
            </code>
          )}
        </pre>
      </div>
    </div>
  )
}
