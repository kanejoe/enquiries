"use client"

import { usePathname, useRouter } from "next/navigation"
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
}

export function Chat({ id, initialMessages, title, className }: ChatProps) {
  const path = usePathname()
  const router = useRouter()

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
      onFinish(message) {
        console.log("🚀 ~ onFinish ~ message:", message)
        console.log(path)
        if (id && !path.includes(id)) {
          window.history.pushState({}, "", `/rag/chat/${id}`)
          // router.push(`/rag/chat/${id}`)
        }
      },
    })

  return (
    <div className="container mt-4 space-y-6">
      <div className={cn("pb-[200px] pt-4 md:pt-10")}>
        {messages.length ? (
          <>
            <ChatList messages={messages} title={title} />
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
