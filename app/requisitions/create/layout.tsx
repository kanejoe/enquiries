import { FC } from "react"

import { HeadingScrollArea } from "../_components/HeadingScrollArea"

interface CreateReqLayoutProps {
  children: React.ReactNode
}

const CreateReqLayout: FC<CreateReqLayoutProps> = ({ children }) => {
  return (
    <main className="container mt-6 flex flex-row gap-y-2">
      <section className="">
        <HeadingScrollArea />
      </section>
      <section className="">{children}</section>
    </main>
  )
}

export default CreateReqLayout
