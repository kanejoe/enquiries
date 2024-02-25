// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from "ai"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { IconOpenAI, IconUser } from "@/lib/components/ui/Icons"
import { cn } from "@/lib/utils"

import { CustomBlockquote } from "./CustomBlockQuote"
import { CustomCodeBlock } from "./CustomCodeBlock"
import { renderers } from "./CustomRenderers"
import { MemoizedReactMarkdown } from "./markdown"

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  console.log("🚀 ~ ChatMessage ~ message:", message.content)
  return (
    <div
      className={cn("group relative mb-4 flex items-start md:-ml-12")}
      {...props}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground"
        )}
      >
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-6 overflow-hidden px-1">
        <Markdown
          //   className=""
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm]}
          components={{
            blockquote: CustomBlockquote,
            code: CustomCodeBlock,
            ...renderers,
          }}
        >
          {message.content}
        </Markdown>
      </div>
    </div>
  )
}
