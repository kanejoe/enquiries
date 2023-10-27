import { cn } from "lib/utils"

import { transformSequenceArray } from "@/lib/tree"
import LoadingDots from "@/components/loading-dots"

interface Requisition {
  id: number
  parent_id: null | number
  sequence: number
  query: string
  reply: null | string
  is_applicable: boolean
  has_doc: boolean
  is_complete: boolean
  level: number
  is_flagged: boolean
  is_required: boolean
  status: null | string
  sequence_in_levels: number[]
  children: Requisition[]
}

interface Props {
  requisitions: Requisition[]
}

const RequisitionComponent: React.FC<Props> = ({ requisitions }) => {
  return (
    <ul role="list" className="space-y-6">
      {requisitions.map((requisitionItem, requisitionItemIdx) => (
        <li key={requisitionItem.id} className="relative flex gap-x-4">
          <div
            className={cn(
              requisitionItemIdx === requisitions.length - 1
                ? "h-6"
                : "-bottom-6",
              "absolute left-0 top-0 flex w-6 justify-center"
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>

          <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          </div>

          <div className="flex w-full flex-row space-x-8 py-0.5 text-sm leading-5 text-gray-500">
            <div className="flex-none font-normal text-gray-900">
              {transformSequenceArray(requisitionItem.sequence_in_levels)}
            </div>
            <div className="text-balance flex-auto">
              {requisitionItem.query} - {requisitionItem.level}
            </div>
            <div className="w-2 flex-none">options</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default RequisitionComponent
