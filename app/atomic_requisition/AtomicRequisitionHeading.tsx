import { DropdownMenuOpts } from "./DropdownOpts"
import { IsApplicableSwitchForm } from "./IsApplicableSwitch"
import { AtomicReq } from "./reqStore"

interface AtomicRequisitionHeadingProps {
  headingReq: AtomicReq
}

export function AtomicRequisitionHeading({
  headingReq,
}: AtomicRequisitionHeadingProps) {
  return (
    <div className="mb-6 w-full group-disabled:opacity-10">
      <div className="flex flex-col justify-between border-b border-dotted pb-2 lg:flex-row">
        <div className="mb-4 mt-1 basis-3/5">
          <div className="ml-0.5 inline-flex justify-center ">
            <div className="mr-4 text-lg font-bold">{headingReq.clauseRef}</div>
            <div className="text-lg font-bold uppercase">
              {headingReq.query}
            </div>
          </div>
        </div>
        <div className="flex flex-initial justify-between lg:min-w-[360px]">
          <div className="mr-2 flex place-content-end place-items-center pr-2">
            <IsApplicableSwitchForm headingReq={headingReq} />
          </div>
          <div className="flex flex-none place-items-center justify-center border-0">
            <DropdownMenuOpts />
          </div>
        </div>
      </div>
    </div>
  )
}
