"use client"

import { FC, useState } from "react"
import { useChat } from "ai/react"
import { toast } from "sonner"

interface ChatWindowProps {
  endpoint: string
}

const ChatWindow: FC<ChatWindowProps> = ({ endpoint }) => {
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({})

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
    setMessages,
  } = useChat({
    api: endpoint,
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources")
      const sources: any[] = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : []
      const messageIndexHeader = response.headers.get("x-message-index")
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        })
      }
    },
    onError: (e) => {
      toast(e.message)
    },
  })

  return <div>ChatWindow Component</div>
}

export { ChatWindow }
