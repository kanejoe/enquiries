import "@/app/globals.css"

import { type Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { fontAlbertSans, fontMono, fontSans } from "@/lib/fonts"
import TanstackProvider from "@/lib/TanstackProviders"
import { cn } from "@/lib/utils"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className="scroll-smooth antialiased scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300"
      >
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            GeistSans.variable,
            GeistMono.variable,
            fontAlbertSans.variable,
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            <TanstackProvider>{children}</TanstackProvider>
            <TailwindIndicator />
          </ThemeProvider>
          <Toaster />
          <Sonner />
        </body>
      </html>
    </>
  )
}
