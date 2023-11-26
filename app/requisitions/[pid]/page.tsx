import { FC, Suspense } from "react"

import { getPrecedentById } from "../_actions/query"
import Header from "./Header"
import { HeaderWrapper } from "./HeaderWrapper"
import Loading from "./loading"
import { QueryWrapper } from "./QueryWrapper"

interface CreateReqLayoutProps {
  params: { pid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateReqLayout: FC<CreateReqLayoutProps> = async ({
  params,
  searchParams,
}) => {
  const headingId =
    typeof searchParams.h === "string" ? +searchParams.h : undefined

  const precedentId = typeof params.pid ? +params.pid : undefined

  return (
    <main>
      {precedentId ? (
        <Suspense fallback={<Loading />}>
          <PrecedentHeader id={precedentId} />
        </Suspense>
      ) : null}
      <div className="container mt-6 grid grid-cols-12 gap-16 p-2">
        <aside className="col-span-4">
          <Suspense fallback={<Loading />}>
            {headingId && precedentId ? (
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
      </div>
    </main>
  )
}

export default CreateReqLayout

async function PrecedentHeader({ id }: { id: number }) {
  const precedent = await getPrecedentById(id)

  return <Header name={precedent.name} subname={precedent.subname} />
}
