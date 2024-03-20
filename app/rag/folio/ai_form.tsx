"use client"

import { useState } from "react"
import { useActions, useUIState } from "ai/rsc"

import type { AI } from "./action"

function FolioForm() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions<typeof AI>()

  return (
    <div className="">
      {
        // View messages in UI state
        messages.map((message) => (
          <div key={message.id}>{message.display}</div>
        ))
      }

      {/* <form
        className="flex flex-col"
        onSubmit={async (e) => {
          setInputValue("")
        }}
      ></form> */}
    </div>
  )
}

export { FolioForm }
