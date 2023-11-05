import { FC } from "react"

import { EnhancedRequisition } from "@/types/RequisitionType"

import { RequisitionItem } from "./RequisitionItem"

type TreeLayoutProps = {
  requisitions: EnhancedRequisition[]
}

export const RequisitionTreeLayout: FC<TreeLayoutProps> = ({
  requisitions,
}) => {
  const haveChildren =
    requisitions && requisitions[0] && requisitions[0].children

  return (
    <div className="mb-6 px-4">
      <ul role="list" className="w-5/6 space-y-6">
        {haveChildren
          ? requisitions[0]?.children?.map(
              (
                requisitionItem: EnhancedRequisition,
                _requisitionItemIdx: number,
                _arr: EnhancedRequisition[]
              ) => {
                const isLastItem = _requisitionItemIdx === _arr.length - 1
                return (
                  <RequisitionItem
                    key={requisitionItem.id}
                    item={requisitionItem}
                    isLastItem={isLastItem}
                  />
                )
              }
            )
          : null}
      </ul>
    </div>
  )
}
