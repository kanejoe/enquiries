"use client"

import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"

type CategoryBadgeProps = {
  category: string
  currentSearchParams: URLSearchParams
}

export function CategoryBadge({
  category,
  currentSearchParams,
}: CategoryBadgeProps) {
  const router = useRouter()
  
  const newSearchParams = new URLSearchParams(currentSearchParams)
  newSearchParams.set("category", `${category}`)
  newSearchParams.delete("page")

  return (
    <Badge
      variant="outline"
      className="select-none rounded-md border-primary hover:cursor-pointer hover:bg-primary/10 hover:text-primary-foreground"
      onClick={() => {
        router.push(`/properties?${newSearchParams}`)
      }}
    >
      {category}
    </Badge>
  )
}

export function ClearCategoryBadge({
  currentSearchParams,
}: {
  currentSearchParams: URLSearchParams
}) {
  const router = useRouter()
  const newSearchParams = new URLSearchParams(currentSearchParams)
  newSearchParams.delete("category")
  newSearchParams.delete("page")

  return (
    <Badge
      variant="outline"
      className="rounded-md hover:cursor-pointer"
      onClick={() => {
        router.push(`/properties?${newSearchParams}`)
      }}
    >
      clear
    </Badge>
  )
}
