import { format } from "path"
import { FC, Suspense } from "react"
import type { Metadata, ResolvingMetadata } from "next"

import { Precedent } from "@/types/RequisitionType"

import { getPrecedentById } from "../_actions/query"
import { PrecedentBubble } from "../_components/PrecedentBubble"
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

  return (
    <>
      <Suspense fallback={<Loading />}>
        <main className="container mt-8 grid h-[calc(100vh-13rem)] grid-cols-6 grid-rows-6 gap-12">
          <section className="col-span-2 row-span-6">
            <div className="grid grid-cols-1 grid-rows-6 gap-y-12">
              <div className="col-span-full row-span-3">
                <PrecedentBubble precedent={precedent} />
              </div>
              <div className="col-span-full row-span-3">
                <section className="col-span-2 row-span-4">
                  stats section
                </section>
              </div>
            </div>
          </section>
          <section className="col-span-4 row-span-1">options</section>
          <section className="col-span-1 row-span-6">headings list</section>

          <section className="col-span-3 row-span-4">main body</section>
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
