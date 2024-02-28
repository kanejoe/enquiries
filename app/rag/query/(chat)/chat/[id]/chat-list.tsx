import { type Message } from "ai"
import { MessageSquareQuote } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { ChatMessage } from "./chat-message"

export interface ChatList {
  messages: Message[]
  title?: string
}

export function ChatList({ messages, title }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-12">
      {title ? (
        <h2 className="-ml-2 mb-8 line-clamp-2 font-albertsans text-lg font-semibold">
          <MessageSquareQuote className="mr-4 inline-block size-6" />
          {title}
        </h2>
      ) : null}
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
