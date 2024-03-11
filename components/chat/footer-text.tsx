import { ComponentProps } from "react"

import { useChats } from "@/lib/hooks/use-chats"
import { cn } from "@/lib/utils"

import { ChatHistoryDialog } from "./chat-history-dialog"

export function FooterText({ className, ...props }: ComponentProps<"p">) {
  const { data: chats } = useChats()

  return (
    <p
      className={cn(
        "px-2 text-center text-xs leading-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      <ChatHistoryDialog chats={chats || []} />
    </p>
  )
}
