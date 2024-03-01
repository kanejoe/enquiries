import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function FooterText({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "px-2 text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      AI chatbot built with Next.js, Tailwind CSS, and OpenAI's GPT-3
    </p>
  )
}
