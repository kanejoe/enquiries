"use client"

import { useChat } from "ai/react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { CustomBlockquote } from "./CustomBlockQuote"
import { CustomCodeBlock } from "./CustomCodeBlock"
// import DocxParser from "./Mammoth"
import { PromptForm } from "./PromptForm"

export default function IndexPage() {
  const { messages, append } = useChat({
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
      <div className="mb-12">
        {messages.length > 0 ? (
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              blockquote: CustomBlockquote,
              code: CustomCodeBlock,
            }}
          >
            {formattedMessages}
          </Markdown>
        ) : null}
      </div>
      {/* <div className="">
        <DocxParser />
      </div> */}
    </div>
  )
}
