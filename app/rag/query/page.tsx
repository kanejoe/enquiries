"use client"

import { useChat } from "ai/react"

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

  return (
    <div className="container mt-4 space-y-6">
      <h1 className="text-2xl font-bold">Prompt Form</h1>
      <div className="max-w-lg">
        <PromptForm handleMessageSubmit={handleMessageSubmit} />
      </div>
      <div className="">
        {messages.length > 0
          ? messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
