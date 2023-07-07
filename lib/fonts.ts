import {
  Albert_Sans as AlbertSans,
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontAlbertSans = AlbertSans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  display: "swap",
})
