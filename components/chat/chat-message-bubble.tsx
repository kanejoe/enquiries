"use client"

import { ComponentProps } from "react"
import type { Message } from "ai/react"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CustomBlockquote } from "@/components/chat/CustomBlockQuote"
import { CustomCodeBlock } from "@/components/chat/CustomCodeBlock"
import { renderers } from "@/components/chat/CustomRenderers"
import { MemoizedReactMarkdown } from "@/components/chat/markdown"

import { ChatAiIcon, ChatUserIcon, SourceIcon } from "./chat-bubble-icons"
import { ChatCopyButton } from "./chat-copy-button"

interface Source {
  document_id: number
  document_name: string
}

interface ChatMessageBubbleProps extends ComponentProps<"div"> {
  message: Message
  sources?: Source[]
}

export function ChatMessageBubble({
  message,
  sources,
}: ChatMessageBubbleProps) {
  const colorClassName = message.role === "user" ? "bg-zinc-50" : "bg-zinc-100"
  const alignmentClassName = message.role === "user" ? "mr-auto" : "ml-auto"
  const ChatIcon = message.role === "user" ? <ChatUserIcon /> : <ChatAiIcon />

  return (
    <div
      className={`${alignmentClassName} ${colorClassName} relative mr-8 max-w-[87%] rounded-2xl px-4 py-2 font-albertsans text-sm transition-shadow hover:shadow hover:shadow-zinc-900/25 dark:border-white/5`}
    >
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/20 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-4 pt-2">
        <div
          className={cn(
            `flex items-start gap-x-8`,
            message.role === "user" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <div className="">{ChatIcon}</div>
          <div className="">
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm]}
              components={{
                blockquote: CustomBlockquote,
                code: CustomCodeBlock,
                ...renderers,
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          </div>
          <div
            className={cn(
              `w-4 shrink-0`,
              message.role === "user" ? "ml-4 mr-4" : "-ml-3 mr-4"
            )}
          >
            <ChatCopyButton copyText={message.content} />
          </div>
        </div>
        {sources && sources.length ? (
          <div className="mt-4 border-t border-dotted">
            <div className="mt-4 flex flex-row gap-x-4 ">
              <h2 className="mr-4 mt-0.5 font-bold text-emerald-800 underline">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <SourceIcon />
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary-foreground">
                      <p>Sources of Information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h2>
              {sources?.map((source, i) => (
                <div className="flex flex-row" key={"source:" + i}>
                  <Badge
                    variant={"outline"}
                    className="font-geistmono font-semibold tracking-wide text-emerald-900"
                  >
                    {source.document_name}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
