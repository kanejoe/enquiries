import { FC } from "react"
import type { Metadata } from "next"

import { UploadComponent } from "./UploadComponent"

export const metadata: Metadata = {
  title: "Retrieval Augmented Generation",
  description: "Retrieval Augmented Generation - a new way to generate text",
}

const IndexPage: FC = () => {
  return (
    <div className="container mt-8 h-full font-albertsans underline-offset-2">
      <h1 className="text-2xl font-semibold text-gray-800">File Uploading</h1>
      <UploadComponent />
    </div>
  )
}

export default IndexPage
