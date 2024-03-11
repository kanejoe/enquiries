"use client"

import { useChat } from "ai/react"

export default function AnthropicChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/anthropic",
  })

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
