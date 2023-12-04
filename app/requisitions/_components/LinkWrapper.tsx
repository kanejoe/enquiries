"use client"

import { MouseEvent, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface LinkWrapperProps {
  children: ReactNode
  href: string
}

export function LinkWrapper({ children, href }: LinkWrapperProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <div onClick={handleClick} className="hover:cursor-pointer">
      {children}
    </div>
  )
}
