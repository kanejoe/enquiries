"use client"

import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { statuses } from "./Status"

export function StatusFilter(props: any) {
  const statusLabel = statuses.map((status) => status.label)
  const selectedValues = new Set(statusLabel as string[])
  console.log(
    "🚀 ~ file: StatusFilter.tsx:10 ~ StatusFilter ~ selectedValues:",
    selectedValues.size
  )
  return (
    <Button variant="outline" size="sm" className="h-8 border-dashed">
      <PlusCircledIcon className="mr-2 h-4 w-4" />
      Status
      {selectedValues?.size > 0 && (
        <>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
            {selectedValues.size}
          </Badge>
        </>
      )}
    </Button>
  )
}
