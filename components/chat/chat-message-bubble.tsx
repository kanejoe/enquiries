"use client"

import type { Message } from "ai/react"

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconCheck, IconCopy } from "@/components/ui/icons"
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon"
import { CheckIcon } from "@/components/icons/CheckIcon"
import { ClipboardIcon } from "@/components/icons/ClipboardIcon"
import { MagnifyingGlassIcon } from "@/components/icons/MagnifyingGlassIcon"
import { UserIcon } from "@/components/icons/UserIcon"

import {
  ChatAiIcon,
  ChatUserIcon,
  CopyIcon,
  PasteIcon,
  SourceIcon,
} from "./chat-bubble-icons"

export function ChatMessageBubble({
  message,
  sources,
}: {
  message: Message
  sources?: any[]
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const colorClassName = message.role === "user" ? "bg-zinc-50" : "bg-zinc-100"
  const alignmentClassName = message.role === "user" ? "mr-auto" : "ml-auto"
  const ChatIcon = message.role === "user" ? <ChatUserIcon /> : <ChatAiIcon />

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  return (
    <div
      className={`${alignmentClassName} ${colorClassName} relative max-w-[90%] rounded-2xl px-4 py-2 font-albertsans text-sm transition-shadow hover:shadow hover:shadow-zinc-900/25 dark:border-white/5`}
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
          <div className="mt-0 text-balance ">{message.content}</div>
          <div
            className={cn(
              `w-4 shrink-0`,
              message.role === "user" ? "ml-4" : "mr-4"
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-zinc-200 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
              onClick={onCopy}
            >
              {isCopied ? <PasteIcon /> : <CopyIcon />}
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
        </div>
        {sources && sources.length ? (
          <div className="mt-4 flex flex-row gap-x-4">
            <h2 className="mr-6 mt-0.5 font-bold text-emerald-800 underline">
              <SourceIcon />
            </h2>
            {sources?.map((source, i) => (
              <div className="flex flex-row" key={"source:" + i}>
                <Badge
                  variant={"outline"}
                  className="font-geistmono font-semibold tracking-wide text-emerald-900"
                >
                  {source.pageContent}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
