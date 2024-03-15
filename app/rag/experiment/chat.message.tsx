import { FC } from "react"
import type { Message } from "ai/react"

import { ChatMessageBubble } from "@/components/chat/chat-message-bubble"

interface ChatMessageBubbleSpecProps {}

const messageUser: Message = {
  id: "1",
  role: "user",
  content:
    "Benjamin Netanyahu has approved plans for an attack on Rafah, the southernmost city in Gaza, where more than a million people displaced from elsewhere in the territory have sought shelter, officials in Israel have said.",
}
const messageAi: Message = {
  id: "1",
  role: "system",
  content:
    "Mike Pence will not endorse for president Donald Trump, the man he served as vice-president for four years but whose supporters chanted for Pence to be hanged as they attacked Congress on January 6.  Asked why, given that he previously promised to endorse the eventual nominee, Pence mentioned 6 January 2021, the day a mob attacked Congress and Trump was reported to have told aides Pence “deserved” to be hanged for refusing to block certification of Joe Biden’s 2020 election win.",
}

const sources = [
  {
    pageContent: "Lorem ipsum dolor sit amet",
    metadata: {
      loc: {
        lines: {
          from: 1,
          to: 5,
        },
      },
    },
  },
  {
    pageContent: "consectetur adipiscing elit",
    metadata: {
      loc: {
        lines: {
          from: 6,
          to: 10,
        },
      },
    },
  },
]

const ChatMessageBubbleSpec: FC<ChatMessageBubbleSpecProps> = (props) => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-y-8 rounded-2xl border border-zinc-200 bg-zinc-50/25 p-8 shadow-lg">
      <ChatMessageBubble message={messageUser} sources={sources} />
      <ChatMessageBubble message={messageAi} sources={sources} />
    </div>
  )
}

export { ChatMessageBubbleSpec }
