"use client"

import { useChat } from "ai/react"
import ReactMarkdown from "react-markdown"

// import { CodeComponent } from "react-markdown/lib/ast-to-react"

import DocxParser from "./Mammoth"
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
        return `User: ${m.content}` // Plain text for user messages
      }
    })
    .join("\n\n")

  const CustomBlockquote = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  )

  const CustomCodeBlock: any = ({
    node,
    inline,
    className,
    children,
    ...props
  }: {
    node: any
    inline: boolean
    className: string
    children: React.ReactNode
    props: any
  }) => {
    const match = /language-(\w+)/.exec(className || "")
    const language = match && match[1] ? match[1] : ""

    return !inline ? (
      <pre
        className={`my-4 overflow-x-auto rounded-lg p-4 ${className}`}
        style={{ backgroundColor: "#2d2d2d", whiteSpace: "pre-wrap" }}
      >
        <code
          className={`language-${language} block font-geistmono text-sm text-white`}
          {...props}
        >
          {children}
        </code>
      </pre>
    ) : (
      <code
        className={`rounded p-1 ${className}`}
        style={{ backgroundColor: "#efefef", whiteSpace: "pre-wrap" }}
      >
        {children}
      </code>
    )
  }
  return (
    <div className="container mt-4 space-y-6">
      <h1 className="text-2xl font-bold">Prompt Form</h1>
      <div className="max-w-lg">
        <PromptForm handleMessageSubmit={handleMessageSubmit} />
      </div>
      <div className="">
        {messages.length > 0 ? (
          <ReactMarkdown
            components={{
              blockquote: CustomBlockquote,
              code: CustomCodeBlock,
            }}
          >
            {formattedMessages}
          </ReactMarkdown>
        ) : null}
      </div>
      <div className="">
        <DocxParser />
      </div>
    </div>
  )
}
