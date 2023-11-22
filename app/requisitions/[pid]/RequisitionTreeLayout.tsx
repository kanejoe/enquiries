"use client"

import { FC } from "react"

import { type EnhancedRequisition } from "@/types/RequisitionType"

import { MotionDiv } from "./framer"
import { RequisitionItem } from "./RequisitionItem"

type TreeLayoutProps = {
  requisitions: EnhancedRequisition[]
}

/**
 *
 * @param param0
 * @returns
 */
export const RequisitionTreeLayout: FC<TreeLayoutProps> = ({
  requisitions,
}) => {
 

  return (
    <MotionDiv
      initial={{ scale: 0.98 }} // Initial state of the component
      animate={{ scale: 1 }} // End state of the component
      transition={{ duration: 0.3 }} // Duration of the animation
    >
      <div className="my-6 ml-6">
        <ul role="list" className="w-7/8 space-y-6">
          {requisitions.map(
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
          )}
        </ul>
      </div>
    </MotionDiv>
  )
}
