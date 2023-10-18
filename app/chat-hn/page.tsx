import { FC } from "react"

import Chat from "./chat"

interface ChatPageProps {}

const ChatPage: FC<ChatPageProps> = (props) => {
  return (
    <div className="container my-6">
      <Chat />
    </div>
  )
}

export default ChatPage
