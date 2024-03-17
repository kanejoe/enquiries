import React from "react"
import type { Message } from "ai/react"

import { ChatMessageBubble } from "./chat.message"

const IndexPage: React.FC = () => {
  // const messages: Message[] = []

  const messages: Message[] = [
    {
      id: "1",
      role: "user",
      content:
        "Benjamin Netanyahu has approved plans for an attack on Rafah, the southernmost city in Gaza, where more than a million people displaced from elsewhere in the territory have sought shelter, officials in Israel have said.",
    },
    {
      id: "2",
      role: "system",
      content:
        "Mike Pence will not endorse for president Donald Trump, the man he served as vice-president for four years but whose supporters chanted for Pence to be hanged as they attacked Congress on January 6.  Asked why, given that he previously promised to endorse the eventual nominee, Pence mentioned 6 January 2021, the day a mob attacked Congress and Trump was reported to have told aides Pence “deserved” to be hanged for refusing to block certification of Joe Biden’s 2020 election win.",
    },
    {
      id: "3",
      role: "user",
      content:
        "The influence of AI extends beyond the legal sector, permeating various facets of Ireland's economy. From healthcare to manufacturing, AI is opening new avenues for innovation and efficiency. It will take jobs, certainly, but it will shift the balance of human activity into more creative areas. The legal profession will be a vanguard in a more widespread transformation of professional roles.",
    },
  ]
  const title =
    "There may be just 40 Russian athletes at Paris 2024, claims IOC vice-president"
  const created_at = "2024-03-03T08:50:50.09186+00:00"

  return (
    <div className="mt-8">
      <ChatMessageBubble
        id="1"
        messages={messages}
        title={title}
        created_at={created_at}
      />
    </div>
  )
}

export default IndexPage
