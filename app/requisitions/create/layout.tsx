import { FC } from "react"

import { HeadingScrollArea } from "../_components/HeadingScrollArea"
import { CardContainer } from "./CardContainer"

interface CreateReqLayoutProps {
  children: React.ReactNode
}

const CreateReqLayout: FC<CreateReqLayoutProps> = ({ children }) => {
  return (
    <main className="container mt-6 flex flex-row gap-x-12">
      <aside className="w-1/4">
        <HeadingScrollArea />
      </aside>
      <section className="w-3/4">
        <div className="flex w-full space-x-24">
          <div className="w-3/5">
            <CardContainer />
          </div>
          <aside className="order-last w-2/5">
            <section className="sticky top-[100px] h-[calc(100vh-100px)]">
              {children}
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default CreateReqLayout
