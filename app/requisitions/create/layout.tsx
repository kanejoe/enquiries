import { FC } from "react"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

import { getAllRequisitionsAction } from "../_actions/actions"
// import { HeadingScrollArea } from "../_components/HeadingScrollArea"
import RequisitionHeadingList from "../_components/RequisitionHeaders"
import { RequisitionContainer } from "./RequisitionContainer"

interface CreateReqLayoutProps {
  children: React.ReactNode
}

const CreateReqLayout: FC<CreateReqLayoutProps> = async ({ children }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["requisitions"],
    queryFn: getAllRequisitionsAction,
  })

  return (
    <main className="container mt-6 flex flex-row gap-x-12 font-albertsans">
      <aside className="w-1/5">
        <RequisitionHeadingList />
      </aside>
      <section className="w-4/5">
        <div className="flex w-full space-x-24">
          <div className="mb-8 w-4/5">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <RequisitionContainer />
            </HydrationBoundary>
          </div>
          <aside className="order-last w-1/5">
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
