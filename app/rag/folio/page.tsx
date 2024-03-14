import { FC } from "react"
import type { Metadata } from "next"

import StreamChat from "./StreamTest"

export const metadata: Metadata = {
  title: "Retrieval Augmented Generation",
  description: "Retrieval Augmented Generation - a new way to generate text",
}

const IndexPage: FC = () => {
  return (
    <div className="container mt-8 h-full font-albertsans underline-offset-2">
      <h1 className="text-2xl font-semibold text-gray-800">folio review</h1>
      <StreamChat />
    </div>
  )
}

export default IndexPage
