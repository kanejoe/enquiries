// "use client"

import { nanoid } from "@/lib/utils"
import { Chat } from "@/components/chat/chat-intro"

import { UploadButton } from "./upload-button"

// import { AnthropicChat } from "./anthropic"

export default function IndexPage() {
  const id = nanoid()
  // const fetchData = () => {
  //   fetch("/api/message")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((error) => console.error("Error fetching data:", error))
  // }

  return (
    <>
      {/* <button onClick={fetchData}>Fetch Data</button> */}
      {/* <AnthropicChat /> */}
      <Chat id={id} />
      <UploadButton />
    </>
  )
}
