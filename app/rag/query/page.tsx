"use client"

import { useChat } from "ai/react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { EmptyScreen } from "@/lib/components/EmptyScreen"
import { cn } from "@/lib/utils"

import { ChatList } from "./chat-list"
import { CustomBlockquote } from "./CustomBlockQuote"
import { CustomCodeBlock } from "./CustomCodeBlock"
import { renderers } from "./CustomRenderers"
// import DocxParser from "./Mammoth"
import { PromptForm } from "./PromptForm"

export default function IndexPage() {
  const { messages, append, setInput } = useChat({
    api: "/api/query_documents",
    onFinish: async () => {
      console.log("Chat finished")
    },
  })

  const handleMessageSubmit = async (values: any) => {
    append({
      role: "user",
      content: values.query,
    })
  }

  const formattedMessages = messages
    .map((m) => {
      // Apply Markdown formatting only to AI messages
      if (m.role === "assistant") {
        return `**AI:** ${m.content}` // Markdown bold for AI's name
      } else {
        return `**User**: ${m.content}` // Plain text for user messages
      }
    })
    .join("\n\n")

  return (
    <div className="container mt-4 space-y-6">
      <h1 className="text-2xl font-bold">Prompt Form</h1>
      <div className="max-w-lg">
        <PromptForm handleMessageSubmit={handleMessageSubmit} />
      </div>

      <div className={cn("pb-[20px] pt-4 md:pt-10")}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            {/* <ChatScrollAnchor trackVisibility={isLoading} /> */}
          </>
        ) : (
          // <EmptyScreen setInput={setInput} />
          <div className="text-center text-gray-500">
            <p>Start by typing a message in the input field above</p>
          </div>
        )}
      </div>

      <div className="h-12">&nbsp;</div>
      {/* <div className="">
        <DocxParser />
      </div> */}
    </div>
  )
}
