"use client"

import { FC, useState } from "react"
import { useChat, type Message } from "ai/react"

import { ChatEmptyScreen } from "@/components/chat/chat-empty-screen"
import { ChatMessageHeader } from "@/components/chat/chat-message-header"
import { ChatPanel } from "@/components/chat/chat-panel"
import { ChatScrollAnchor } from "@/components/chat/chat-scroll-anchor"

import { ChatMessageList } from "./chat-message-list"

const sources = [
  { document_id: 1, document_name: "example.pdf" },
  { document_id: 2, document_name: "example2.pdf" },
]

interface ChatMessageBubbleProps {
  id: string
  height?: string
  title?: string
  created_at: string
  endpoint: string
}

const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({
  height = "430px",
  title,
  created_at,
  id,
  endpoint = "api/query_documents",
}: ChatMessageBubbleProps) => {
  const { messages, input, setInput, isLoading, append, reload, stop } =
    useChat({
      api: endpoint,
    })

  const divStyle = { maxHeight: height }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-y-6">
      {/*  <div className="mx-8 grid grid-cols-12 gap-4">*/}
      {/* <div className="col-span-9"> */}
      {messages.length ? (
        <>
          <ChatMessageHeader title={title} isoDateString={created_at} />

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/25 bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] py-8 pl-8 pr-2 shadow-lg">
            <div
              style={divStyle} // Apply inline style here
              className={`flex flex-col gap-y-8 overflow-y-auto scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-100`}
            >
              <ChatMessageList messages={messages} isLoading={isLoading} />
            </div>
          </div>
          <ChatScrollAnchor trackVisibility={isLoading} />
        </>
      ) : (
        <ChatEmptyScreen setInput={setInput} />
      )}
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        messages={messages}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
      />
    </div>
    // </div>
  )
}

export { ChatMessageBubble }
