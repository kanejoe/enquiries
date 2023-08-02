"use client"

import { AtomicRequisitionHeading } from "./AtomicRequisitionHeading"
import { AtomicSectionContainer } from "./AtomicSectionContainer"
import { DetailsCard } from "./detail_card"
import { Footer } from "./Footer"
import { ReqHeadingDataTable } from "./heading-page"
import { useAtomicReqStore } from "./reqStore"

/**
 *
 * @returns
 */
export default function AtomicRequisitionPage() {
  const requisitions = useAtomicReqStore((state) => state.requisitions)
  const headings = useAtomicReqStore((state) => state.headings)

  const headingReq = requisitions.find((req) => req.level === 0)
  const bodyReqs = requisitions.filter((req) => req.level !== 0)

  return (
    <section className="mt-4 lg:flex lg:gap-x-8">
      <div className="mt-8 hidden lg:block lg:w-1/5">
        <div className="flex flex-col gap-y-6">
          <DetailsCard />
          <ReqHeadingDataTable headings={headings} />
        </div>
      </div>
      <div className="lg:w-4/5">
        <div className="mt-6 flex flex-col rounded p-6 dark:bg-slate-950">
          {headingReq ? (
            <AtomicRequisitionHeading headingReq={headingReq} />
          ) : null}
          {headingReq ? (
            <AtomicSectionContainer
              bodyReqs={bodyReqs}
              headingIsApplicable={headingReq.isApplicable}
            />
          ) : null}

          <Footer />
        </div>
      </div>
    </section>
  )
}
