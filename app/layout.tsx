import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const SITE_URL = 'https://rogiant.com'
const SITE_NAME = 'Rogiant'
const SITE_TITLE = 'Rogiant - Python library for the Roblox API with built-in databases'
const SITE_DESCRIPTION =
  'Rogiant is a high-performance Python library for the Roblox API with built-in support for SQLite, PostgreSQL, MongoDB, Redis, and MySQL. Build bots, dashboards, group tools, trading workflows, and automation services.'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Rogiant',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'v0.app',
  metadataBase: new URL(SITE_URL),
  keywords: [
    'rogiant',
    'rogiant.com',
    'roblox api',
    'roblox python',
    'python roblox library',
    'roblox bot',
    'roblox open cloud',
    'roblox datastore',
    'roblox automation',
    'roblox sdk',
    'python sqlite',
    'python postgresql',
    'python mongodb',
    'python redis',
  ],
  authors: [{ name: 'Rogiant', url: SITE_URL }],
  creator: 'Rogiant',
  publisher: 'Rogiant',
  category: 'technology',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/rogiant-logo.png',
    shortcut: '/rogiant-logo.png',
    apple: '/rogiant-logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@rogiant',
  },
  verification: {
    google: 'rogiant-google-site-verification',
  },
}

export const viewport = {
  themeColor: '#1d4ed8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
