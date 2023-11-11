import { FC, ReactNode, Suspense } from "react"

import RequisitionHeadingList from "../_components/RequisitionHeaders"
import { RequisitionContainer } from "./RequisitionContainer"

interface CreateReqLayoutProps {
  children: ReactNode
  // params: { name: string; id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateReqLayout: FC<CreateReqLayoutProps> = async ({
  children,
  searchParams,
  // params,
}) => {
  console.log("🚀 ~ file: page.tsx:15 ~ searchParams:", searchParams)
  return (
    <main className="container grid h-screen grid-cols-12 gap-16 p-2">
      <aside className="col-span-4">
        <Suspense fallback={<div>Loading...</div>}>
          <RequisitionHeadingList />
        </Suspense>
      </aside>
      <section className="col-span-8">
        <Suspense fallback={<div>Loading...</div>}>
          <RequisitionContainer />
        </Suspense>
      </section>
    </main>
  )
}

export default CreateReqLayout
