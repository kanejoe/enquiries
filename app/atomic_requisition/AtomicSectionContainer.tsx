import { cn } from "@/lib/utils"

import { AtomicRequisition } from "./AtomicRequisition"
import { AtomicReq } from "./reqStore"

interface AtomicSectionContainerProps {
  bodyReqs: AtomicReq[]
  headingIsApplicable: AtomicReq["isApplicable"]
}

export function AtomicSectionContainer({
  bodyReqs,
  headingIsApplicable,
}: AtomicSectionContainerProps) {
  const fieldsetCSS = cn(
    "group transition delay-200",
    { "opacity-100": headingIsApplicable },
    { "opacity-50 bg-slate-50": !headingIsApplicable }
  )
  return (
    <section className="">
      <fieldset className={fieldsetCSS} disabled={!headingIsApplicable}>
        {bodyReqs.map((requisition) => {
          return <AtomicRequisition requisition={requisition} />
        })}
      </fieldset>
    </section>
  )
}
