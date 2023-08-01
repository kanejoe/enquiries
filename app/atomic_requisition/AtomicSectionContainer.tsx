import { cn } from "@/lib/utils"

import { AtomicRequisition } from "./AtomicRequisition"
import { AtomicReq } from "./reqStore"

interface AtomicSectionContainerProps {
  bodyReqs: AtomicReq[]
  isApplicable: AtomicReq["isApplicable"]
}

export function AtomicSectionContainer({
  bodyReqs,
  isApplicable,
}: AtomicSectionContainerProps) {
  const fieldsetCSS = cn(
    "group transition delay-200",
    { "opacity-100": isApplicable },
    { "opacity-50 bg-slate-50": !isApplicable }
  )
  return (
    <section className="">
      <fieldset className={fieldsetCSS} disabled={!isApplicable}>
        {bodyReqs.map((requisition) => {
          return <AtomicRequisition requisition={requisition} />
        })}
      </fieldset>
    </section>
  )
}
