"use client"

import { ComponentProps } from "react"
import { usePathname } from "next/navigation"
import { useChat, type Message } from "ai/react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { ChatList } from "./ChatList"
import { ChatPanel } from "./ChatPanel"
import { EmptyScreen } from "./EmptyScreen"

export interface ChatProps extends ComponentProps<"div"> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const path = usePathname()
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      id,
      initialMessages,
      body: { id },
      onResponse: (response) => {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish() {
        // if (!path.includes("/rag/chat")) {
        //   window.history.pushState({}, "", `/rag/chat/${id}`)
        // }
      },
    })

  return (
    <div className="flex h-full flex-col">
      <div className="mt-8 flex-1 overflow-auto">
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            {/* <ChatScrollAnchor trackVisibility={isLoading} /> */}
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>

      <div className="sticky bottom-0 bg-white">
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  )
}
