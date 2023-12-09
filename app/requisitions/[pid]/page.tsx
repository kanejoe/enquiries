import { format } from "path"
import { FC, Suspense } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { EnhancedRequisition, Precedent } from "@/types/RequisitionType"
import { createRequisitionTree, getHeaderNodes } from "@/lib/tree"

import { getPrecedentById } from "../_actions/query"
import { PrecedentBubble } from "../_components/PrecedentBubble"
import { ReqHeadingList } from "../_components/ReqHeadings"
import { RequisitionStats } from "../_components/RequisitionStats"
import { UnderDevelopment } from "../_components/UnderDevelopment"
import Header from "./Header"
import { HeaderWrapper } from "./HeaderWrapper"
import Loading from "./loading"
import { QueryWrapper } from "./QueryWrapper"

interface CreateReqLayoutProps {
  params: { pid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

type Props = {
  params: { pid: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const precedentId = typeof params.pid ? +params.pid : undefined
  const precedent = precedentId
    ? await getPrecedentById(precedentId)
    : undefined

  return {
    title: formatDescription(precedent) ?? undefined,
  }
}

const CreateReqLayout: FC<CreateReqLayoutProps> = async ({
  params,
  searchParams,
}) => {
  const headingId =
    typeof searchParams.h === "string" ? +searchParams.h : undefined

  // precedentId is the id of the precedent that is being used to create the requisition
  const precedentId = typeof params.pid ? +params.pid : undefined

  const precedent = precedentId
    ? await getPrecedentById(precedentId)
    : undefined

  if (!precedent || !precedentId) {
    return <div className="">no precedent or precedentId</div>
  }

  const requiredRequisitionsCount = precedent.requisitions.filter(
    (req) => req.is_required === true
  ).length

  const requisitionTree = createRequisitionTree(
    precedent.requisitions as EnhancedRequisition[]
  )
  const headerNodes = getHeaderNodes(requisitionTree)
  // console.log("🚀 ~ file: page.tsx:59 ~ headerNodes:", headerNodes)

  return (
    <>
      <Suspense fallback={<Loading />}>
        <main className="grid-rows-12 container mt-8 grid h-[calc(100vh-13rem)] grid-cols-12 gap-x-12 gap-y-4">
          <section className="col-span-3 row-span-full">
            <div className="grid grid-cols-1 grid-rows-6 gap-y-12">
              <div className="col-span-full row-span-3">
                <PrecedentBubble precedent={precedent} />
              </div>
              <div className="col-span-full row-span-3">
                <section className="col-span-2 row-span-4">
                  <RequisitionStats totalReqs={requiredRequisitionsCount} />
                </section>
              </div>
            </div>
          </section>
          <section className="col-span-9 row-span-1 ">
            <UnderDevelopment />
          </section>
          <section className="row-end-12 col-span-3 row-start-3">
            <ReqHeadingList headerNodes={headerNodes} />
          </section>

          <section className="row-end-12 col-span-6 row-start-3">
            main body
          </section>
        </main>
      </Suspense>
      {/* {precedentId ? (
        <Suspense fallback={<Loading />}>
          <PrecedentHeader id={precedentId} />
        </Suspense>
      ) : null}
      <div className="container mt-6 grid grid-cols-12 gap-16 p-2">
        <aside className="col-span-4">
          <Suspense fallback={<Loading />}>
            {precedentId ? (
              <HeaderWrapper headingId={headingId} precedentId={precedentId} />
            ) : null}
          </Suspense>
        </aside>

        <section className="col-span-8">
          <Suspense fallback={<Loading />}>
            {headingId && precedentId ? (
              <QueryWrapper headingId={headingId} precedentId={precedentId} />
            ) : null}
          </Suspense>
        </section>
      </div> */}
    </>
  )
}

export default CreateReqLayout

async function PrecedentHeader({ id }: { id: number }) {
  const precedent = await getPrecedentById(id)

  return <Header name={precedent.name} subname={precedent.subname} />
}

function formatDescription(precedent?: Precedent): string {
  // Using logical OR (||) to provide a default empty string if values are undefined
  const name = precedent?.name || ""
  const subname = precedent?.subname || ""

  // Constructing the description
  let description = name
  if (name && subname) {
    description += " - "
  }
  description += subname

  return description
}
