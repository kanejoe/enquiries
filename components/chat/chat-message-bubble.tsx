"use client"

import type { Message } from "ai/react"

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"

import { ChatBubbleIcon } from "../icons/ChatBubbleIcon"
import { UserIcon } from "../icons/UserIcon"
import { Button } from "../ui/button"
import { IconCheck, IconCopy } from "../ui/icons"

export function ChatMessageBubble({
  message,
  sources,
}: {
  message: Message
  sources: any[]
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
      className={`${alignmentClassName} ${colorClassName} relative max-w-[90%] rounded-2xl px-4 py-2 font-albertsans text-sm transition-shadow hover:shadow hover:shadow-zinc-900/25`}
    >
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
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
              {isCopied ? (
                <IconCheck className="text-slate-600" />
              ) : (
                <IconCopy className="text-slate-600" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col whitespace-pre-wrap">
          {/* {sources && sources.length ? (
            <>
              <code className="mr-auto mt-4 rounded bg-slate-100 px-2 py-1">
                <h2>🔍 Sources:</h2>
              </code>
              <code className="mr-2 mt-1 rounded bg-slate-200 px-2 py-1 text-xs">
                {sources?.map((source, i) => (
                  <div className="mt-2" key={"source:" + i}>
                    {i + 1}. &quot;{source.pageContent}&quot;
                    {source.metadata?.loc?.lines !== undefined ? (
                      <div>
                        <br />
                        Lines {source.metadata?.loc?.lines?.from} to{" "}
                        {source.metadata?.loc?.lines?.to}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </code>
            </>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  )
}

function ChatUserIcon() {
  return (
    <div className="dark:bg-white/7.5 flex size-10 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-emerald-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
      <UserIcon className="size-6 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
    </div>
  )
}

function ChatAiIcon() {
  return (
    <div className="dark:bg-white/7.5 flex size-10 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
      <ChatBubbleIcon className="size-6 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
    </div>
  )
}
