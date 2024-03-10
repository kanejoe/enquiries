import { type Message } from "ai"
import { BookType, FileText, MessageSquareQuote } from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { ChatMessage } from "./chat-message"
import { ChatSourcesList } from "./chat-sources"

export interface ChatList {
  messages: Message[]
  title?: string
  sources?: any
}

export function ChatList({ messages, title, sources }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-12">
      {title ? (
        <h2 className="-ml-2 mb-8 line-clamp-2 flex font-albertsans text-lg font-semibold">
          <BookType className="mr-6 mt-1 inline-block size-7 shrink-0" />
          <span className="underline decoration-sky-500 underline-offset-2">
            {title}
          </span>
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

      {/* {sources && sources.length ? <ChatSourcesList sources={sources} /> : null} */}
    </div>
  )
}
