import { FC, Suspense } from "react"
import { HomeModernIcon } from "@heroicons/react/20/solid"

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
      <header className="relative isolate pt-4">
        <div
          className="absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
            <div
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-primary/20 to-muted-foreground/50"
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-0">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-x-6">
              <HomeModernIcon className="h-12 w-12 flex-none rounded-full bg-primary fill-gray-800 p-1.5 shadow ring-4 ring-primary/10 " />
              <h1>
                <div className="mt-1 text-xl font-semibold leading-6 text-gray-900">
                  Requisitions on Title
                </div>
                <div className="text-sm leading-6 text-gray-500">
                  (2019 Edition)
                </div>
              </h1>
            </div>
          </div>
        </div>
      </header>
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
