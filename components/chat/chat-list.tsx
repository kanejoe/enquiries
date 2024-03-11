import { type Message } from "ai"
import { BookOpenText } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { ChatMessage } from "./chat-message"

// import { ChatSourcesList } from "./chat-sources"

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
    <div className="relative mx-auto max-w-2xl px-6">
      {title ? (
        <h2 className="mb-8 line-clamp-2 flex font-albertsans text-xl">
          <BookOpenText className="mr-6 mt-0.5 inline-block size-8 shrink-0 fill-sky-300" />
          <span className="font-semibold text-sky-900 underline decoration-sky-900 underline-offset-2">
            {title}
          </span>
        </h2>
      ) : null}

      <ScrollArea className="h-[600px] w-full rounded-md">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
            {index < messages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        ))}
      </ScrollArea>

      {/* {sources && sources.length ? <ChatSourcesList sources={sources} /> : null} */}
    </div>
  )
}
