"use client"

import { MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftCircle } from "lucide-react"

interface BackArrowUpNavProps {
  href: string
}

export function BackArrowUpNav({ href }: BackArrowUpNavProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(`../${href}`)
  }

  return (
    <div onClick={handleClick} className="hover:cursor-pointer">
      <ArrowLeftCircle className="h-6 w-6 fill-primary active:translate-y-px" />
    </div>
  )
}
