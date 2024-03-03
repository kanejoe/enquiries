"use client"

import { ComponentProps } from "react"

import { useSidebar } from "@/lib/hooks/use-sidebar"
import { cn } from "@/lib/utils"

export interface SidebarProps extends ComponentProps<"div"> {}

export function Sidebar({ className, children }: SidebarProps) {
  // const { isSidebarOpen, isLoading } = useSidebar()

  return (
    <div
      // data-state={isSidebarOpen && !isLoading ? "open" : "closed"}
      data-state="open"
      className={cn(className, "h-full flex-col dark:bg-zinc-950")}
    >
      {children}
    </div>
  )
}
