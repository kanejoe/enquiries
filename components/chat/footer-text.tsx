import { ComponentProps } from "react"

import { useChats } from "@/lib/hooks/use-chats"
import { useStorageFiles } from "@/lib/hooks/use-files"
import { cn } from "@/lib/utils"

import { ChatHistoryDialog } from "./chat-history-dialog"
import { DocumentListDialog } from "./document-list-dialog"

export function FooterText({ className, ...props }: ComponentProps<"p">) {
  const { data: chats } = useChats()
  const { data: documents } = useStorageFiles()

  return (
    <div className="flex justify-between" {...props}>
      <ChatHistoryDialog chats={chats || []} />
      <DocumentListDialog documents={documents || []} />
    </div>
  )
}
