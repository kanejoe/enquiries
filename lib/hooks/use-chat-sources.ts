import { useCallback, useState } from "react"
import { useChat } from "ai/react"
import { toast } from "sonner"

// Custom hook interface
interface UseChatWithSourcesProps {
  api: string
}

// Custom hook return type
interface UseChatWithSourcesReturn {
  messages: any[]
  input: string
  setInput: (input: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  sourcesForMessages: Record<string, any>
  setMessages: (messages: any[]) => void
}

const useChatWithSources = ({
  api,
}: UseChatWithSourcesProps): UseChatWithSourcesReturn => {
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, any>
  >({})

  const chatHook = useChat({
    api,
    onResponse: (response) => {
      const sourcesHeader = response.headers.get("x-sources")
      const sources: any[] = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : []
      const messageIndexHeader = response.headers.get("x-message-index")
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages((prevSources) => ({
          ...prevSources,
          [messageIndexHeader]: sources,
        }))
      }
    },
    onError: (e) => {
      toast(e.message)
    },
  })

  return {
    ...chatHook,
    sourcesForMessages,
  }
}

export default useChatWithSources
