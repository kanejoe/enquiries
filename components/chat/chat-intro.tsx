"use client"

import { usePathname } from "next/navigation"
import { useChat, type Message } from "ai/react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { ChatEmptyScreen } from "./chat-empty-screen"
import { ChatList } from "./chat-list"
import { ChatPanel } from "./chat-panel"
import { ChatScrollAnchor } from "./chat-scroll-anchor"

// import { ChatScrollAnchor } from "./chat-scroll-anchor"

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
        if (response.status === 401) {
          toast.error(response.statusText)
        }
        const documentSources = response.headers.get("X-Source-Document")
        const sources = documentSources
          ? JSON.parse(Buffer.from(documentSources, "base64").toString("utf8"))
          : []
        console.log("🚀 ~ onResponse ~ sources:", sources)
      },
      onFinish() {
        if (id && !path.includes(id)) {
          window.history.pushState(null, "", `${path}/${id}`)
        }
      },
    })

  return (
    <div className="mt-4 space-y-6">
      <div className={cn("pb-[80px] pt-4")}>
        {messages.length ? (
          <>
            <ChatList
              messages={messages}
              title={title}
              sources={sources}
              isLoading={isLoading}
            />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <ChatEmptyScreen setInput={setInput} />
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
