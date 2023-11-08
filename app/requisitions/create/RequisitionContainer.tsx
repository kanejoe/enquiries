import { FC } from "react"

import { type EnhancedRequisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { ErrorMessage } from "../_components/ErrorMessage"
import { RequisitionTreeLayout } from "./RequisitionTreeLayout"

export const RequisitionContainer: FC = async () => {
  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  const requisitionTree = createRequisitionTree(
    requisitions as unknown as EnhancedRequisition[]
  )

  const instantHeadingNode = findNodeByReqId(requisitionTree, 18)

  return (
    <>
      <div className="sticky top-[var(--gap-to-top)] mt-2">
        <div className="h-[calc(100vh-8rem)] overflow-y-auto rounded-t-xl border border-gray-100 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          <div className="sticky top-0 z-10 mb-3">
            {instantHeadingNode ? (
              <div className="flex flex-row space-x-5 bg-gray-50 px-4 py-4 text-2xl font-semibold uppercase tracking-wide text-gray-700">
                <div className="">{instantHeadingNode.sequence}</div>
                <div className="">{instantHeadingNode.query}</div>
              </div>
            ) : null}
          </div>
          {requisitionTree ? (
            <RequisitionTreeLayout requisitions={requisitionTree} />
          ) : null}
        </div>
      </div>
    </>
  )
}
