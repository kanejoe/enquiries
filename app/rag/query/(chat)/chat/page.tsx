// "use client"

import { nanoid } from "@/lib/utils"
import { Chat } from "@/components/chat/chat-intro"

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
      <Chat id={id} />
    </>
  )
}
