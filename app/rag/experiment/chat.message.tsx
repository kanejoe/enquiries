import { FC } from "react"
import type { Message } from "ai/react"

import { cn } from "@/lib/utils"
import { ChatHeaderIcon } from "@/components/chat/chat-bubble-icons"
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble"

interface ChatMessageBubbleSpecProps {}

const messageUser: Message = {
  id: "1",
  role: "user",
  content:
    "Benjamin Netanyahu has approved plans for an attack on Rafah, the southernmost city in Gaza, where more than a million people displaced from elsewhere in the territory have sought shelter, officials in Israel have said.",
}
const messageUser1: Message = {
  id: "3",
  role: "user",
  content:
    "The influence of AI extends beyond the legal sector, permeating various facets of Ireland's economy. From healthcare to manufacturing, AI is opening new avenues for innovation and efficiency. It will take jobs, certainly, but it will shift the balance of human activity into more creative areas. The legal profession will be a vanguard in a more widespread transformation of professional roles.",
}
const messageAi: Message = {
  id: "2",
  role: "system",
  content:
    "Mike Pence will not endorse for president Donald Trump, the man he served as vice-president for four years but whose supporters chanted for Pence to be hanged as they attacked Congress on January 6.  Asked why, given that he previously promised to endorse the eventual nominee, Pence mentioned 6 January 2021, the day a mob attacked Congress and Trump was reported to have told aides Pence “deserved” to be hanged for refusing to block certification of Joe Biden’s 2020 election win.",
}

const sources = [
  { document_id: 1, document_name: "example.pdf" },
  { document_id: 2, document_name: "example2.pdf" },
]

interface ChatMessageBubbleSpecProps {
  height?: string
}

const ChatMessageBubbleSpec: FC<ChatMessageBubbleSpecProps> = ({
  height = "540px",
}: ChatMessageBubbleSpecProps) => {
  const divStyle = { maxHeight: height }
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/25 bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] px-4 py-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-zinc-900/20 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
        <h2 className="flex flex-row">
          <div className="w-16 shrink-0">
            <ChatHeaderIcon />
          </div>
          <div className="mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap pr-8 font-albertsans text-xl font-semibold text-zinc-600">
            There may be just 40 Russian athletes at Paris 2024, claims IOC
            vice-president
          </div>
        </h2>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/25 bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] py-8 pl-8 pr-2 shadow-lg">
        <div
          style={divStyle} // Apply inline style here
          className={`flex flex-col gap-y-8 overflow-y-auto scrollbar-thin scrollbar-track-zinc-50 scrollbar-thumb-zinc-100`}
        >
          <ChatMessageBubble message={messageUser} />
          <ChatMessageBubble message={messageAi} sources={sources} />
          <ChatMessageBubble message={messageUser1} />
        </div>
      </div>
    </div>
  )
}

export { ChatMessageBubbleSpec }
