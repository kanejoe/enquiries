"use client"

import { useRouter } from "next/navigation"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type PropertyTableColumnHeaderProps = {
  title: string
  columnName: string
  className?: string
  currentSearchParams: URLSearchParams
}

export function PropertyTableColumnHeader({
  title,
  columnName,
  className,
  currentSearchParams,
}: PropertyTableColumnHeaderProps) {
  //   if (!column.getCanSort()) {
  //     return <div className={cn(className)}>{title}</div>
  //   }

  const router = useRouter()
  const newSearchParams = new URLSearchParams(currentSearchParams)

  const toggleSorting = (descending: boolean) => {
    newSearchParams.set("sort", `${columnName}`)
    newSearchParams.set("order", `${descending ? "desc" : "asc"}`)
    router.push(`/properties?${newSearchParams}`)
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>

            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
