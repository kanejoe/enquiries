import React from "react"

import { ChatMessageBubbleSpec } from "./chat.message"

const IndexPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is the index page.</p>
      <ChatMessageBubbleSpec />
    </div>
  )
}

export default IndexPage
