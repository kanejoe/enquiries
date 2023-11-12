import { FC, ReactNode, Suspense } from "react"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import RequisitionHeadingList from "../_components/RequisitionHeaders"
import { Lorem } from "./Lorem"
import { QueryWrapper } from "./QueryWrapper"
import { RequisitionContainer } from "./RequisitionContainer"
import { StickyWrapper } from "./StickyWrapper"

interface CreateReqLayoutProps {
  children: ReactNode
  // params: { name: string; id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateReqLayout: FC<CreateReqLayoutProps> = async ({
  children,
  searchParams: { h: headingId, ...searchParams },
  // params,
}) => {
  console.log("🚀 ~ file: page.tsx:15 ~ searchParams:", headingId)
  return (
    <main className="container mt-6 grid grid-cols-12 gap-16 p-2">
      <aside className="col-span-4">
        <StickyWrapper
          footerComponent={<FooterComponent />}
          headerComponent={<HeaderComponent />}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <RequisitionHeadingList />
          </Suspense>
        </StickyWrapper>
      </aside>
      <section className="col-span-8">
        <Suspense fallback={<div>Loading...</div>}>
          {headingId ? <QueryWrapper headingId={+headingId} /> : null}
        </Suspense>
      </section>
    </main>
  )
}

export default CreateReqLayout

const HeaderComponent = () => {
  return (
    <div className="ml-6 mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">
      Headings
    </div>
  )
}

const FooterComponent = () => {
  return (
    <div className="flex h-full items-center justify-center rounded-b-xl bg-gray-50">
      <div className="mb-4">
        <Button className="w-96">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          New Header Topic
        </Button>
      </div>
    </div>
  )
}
