import { type FC } from "react"

import { FormUpload } from "./FormUpload"

type SummariseFolioPageProps = {}

const SummariseFolioPage: FC<SummariseFolioPageProps> = (props) => {
  return (
    <div className="container my-6">
      <div className="">
        <h1 className="text-lg font-bold">Summarise a Folio</h1>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Summarise a Folio</p>
      </div>
      <div className="mt-4">
        <FormUpload />
      </div>
    </div>
  )
}

export default SummariseFolioPage
