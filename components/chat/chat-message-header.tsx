"use client"

import { FC } from "react"

import { getReadableDate } from "@/lib/date-utils"
import { Badge } from "@/components/ui/badge"

import { ChatHeaderIcon } from "./chat-bubble-icons"

interface ChatMessageHeaderProps {
  title: string
  isoDateString?: string
}

const ChatMessageHeader: FC<ChatMessageHeaderProps> = ({
  title,
  isoDateString,
}) => {
  const date = isoDateString ? new Date(isoDateString) : new Date()
  const readableDate = getReadableDate(date)

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50/25 bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-zinc-900/20 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <h2 className="flex flex-row">
        <div className="w-16 shrink-0">
          <ChatHeaderIcon />
        </div>
        <div className="mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap pr-8 font-albertsans text-xl font-semibold text-zinc-600">
          {title}
        </div>
      </h2>
      <div className="mr-4 mt-2 flex w-full justify-end">
        <Badge variant={"secondary"} className="bg-zinc-100">
          {readableDate}
        </Badge>
      </div>
    </div>
  )
}

export { ChatMessageHeader }
