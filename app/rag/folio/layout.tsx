import { ReactNode } from "react"
import type { Metadata } from "next"

import { AI } from "./action"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <AI>{children}</AI>
    </>
  )
}