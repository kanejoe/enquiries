"use client"

import { usePathname } from "next/navigation"
import { useChat, type Message } from "ai/react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { EmptyScreen } from "./chat-empty-screen"
import { ChatList } from "./chat-list"
import { ChatPanel } from "./chat-panel"
import { ChatScrollAnchor } from "./chat-scroll-anchor"

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[]
  id?: string
  title?: string
  sources?: any
}

export function Chat({ id, initialMessages, title, sources }: ChatProps) {
  const path = usePathname()

  const { messages, append, setInput, isLoading, reload, input, stop } =
    useChat({
      initialMessages,
      id,
      body: { id },
      api: "/api/query_documents",
      onResponse(response) {
        // console.log("🚀 ~ onResponse ~ response:", response)
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        if (id && !path.includes(id)) {
          window.history.pushState(null, "", `${path}/${id}`)
          // router.push(`/rag/chat/${id}`)
        }
      },
    })

  return (
    <div className="mt-4 space-y-6">
      <div className={cn("pb-[80px] pt-4")}>
        {messages.length ? (
          <>
            <ChatList messages={messages} title={title} sources={sources} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
