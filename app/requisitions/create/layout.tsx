import { FC } from "react"

import { HeadingScrollArea } from "../_components/HeadingScrollArea"
import { RequisitionCardList } from "../_components/RequisitionCardList"

interface CreateReqLayoutProps {
  children: React.ReactNode
}

const CreateReqLayout: FC<CreateReqLayoutProps> = ({ children }) => {
  return (
    <main className="container mt-6 flex flex-row gap-x-12">
      <section className="w-1/4">
        <HeadingScrollArea />
      </section>
      <section className="w-3/4">
        <div className="flex w-full">
          <div className="w-3/5">
            <RequisitionCardList />
          </div>
          <div className="w-2/5">{children}</div>
        </div>
      </section>
    </main>
  )
}

export default CreateReqLayout
