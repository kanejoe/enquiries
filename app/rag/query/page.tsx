"use client"

import { useChat } from "ai/react"
import { toast } from "sonner"

import { EmptyScreen } from "@/lib/components/EmptyScreen"
import { cn, nanoid } from "@/lib/utils"

import { ChatList } from "./chat-list"
import { ChatPanel } from "./chat-panel"
import { ChatScrollAnchor } from "./chat-scroll-anchor"

// import DocxParser from "./Mammoth"

export default function IndexPage() {
  const id = nanoid()

  const { messages, append, setInput, isLoading, reload, input, stop } =
    useChat({
      api: "/api/query_documents",
      onResponse(response) {
        console.log("🚀 ~ onResponse ~ response:", response)
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish: async () => {
        console.log("Chat finished")
      },
    })

  return (
    <div className="container mt-4 space-y-6">
      <div className={cn("pb-[200px] pt-4 md:pt-10")}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
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
