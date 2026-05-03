"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  filename?: string
  language?: string
  className?: string
}

export function CodeBlock({ code, filename, language = "python", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-lg border border-border overflow-hidden", className)}>
      {filename && (
        <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-2 text-sm text-muted-foreground">{filename}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <div className="bg-slate-900 p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-slate-100 font-mono whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  )
}
