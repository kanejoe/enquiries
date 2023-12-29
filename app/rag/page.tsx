import { FC } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Retrieval Augmented Generation",
  description: "Retrieval Augmented Generation - a new way to generate text",
}

const RetrievalAugmentedGenerationPage: FC = () => {
  return (
    <div className="container mt-8 font-albertsans underline-offset-2 ">
      <h1 className="text-2xl font-semibold text-gray-800">
        Retrieval Augmented Generation
      </h1>
      {/* Add your content here */}
    </div>
  )
}

export default RetrievalAugmentedGenerationPage
