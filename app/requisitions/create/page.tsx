import { FC, Suspense } from "react"

import { HeaderWrapper } from "./HeaderWrapper"
import Loading from "./loading"
import { QueryWrapper } from "./QueryWrapper"

interface CreateReqLayoutProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const CreateReqLayout: FC<CreateReqLayoutProps> = async ({ searchParams }) => {
  const headingId =
    typeof searchParams.h === "string" ? +searchParams.h : undefined

  return (
    <main className="container mt-6 grid grid-cols-12 gap-16 p-2">
      <aside className="col-span-4">
        <Suspense fallback={<Loading />}>
          {headingId ? <HeaderWrapper headingId={headingId} /> : null}
        </Suspense>
      </aside>

      <section className="col-span-8">
        <Suspense fallback={<Loading />}>
          {headingId ? <QueryWrapper headingId={headingId} /> : null}
        </Suspense>
      </section>
    </main>
  )
}

export default CreateReqLayout
