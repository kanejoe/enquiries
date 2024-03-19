import type { Message } from "ai/react"

import { ChatMessageBubble } from "@/components/chat/chat-message-bubble"
import { ChatScrollAnchor } from "@/components/chat/chat-scroll-anchor"

export interface ChatMessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessageList({ messages, isLoading }: ChatMessageListProps) {
  if (!messages.length) {
    return null
  }

  return (
    <>
      {messages.map((message, index) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
      <ChatScrollAnchor trackVisibility={isLoading} />
    </>
  )
}
