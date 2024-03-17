import type { Message } from "ai/react"

import { ChatMessageBubble } from "@/components/chat/chat-message-bubble"

export interface ChatMessageListProps {
  messages: Message[]
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  if (!messages.length) {
    return null
  }

  return (
    <>
      {messages.map((message, index) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
    </>
  )
}
