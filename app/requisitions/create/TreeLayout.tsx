"use client"

import { FC } from "react"

import { Requisition } from "@/types/RequisitionType"

import { RequisitionItem } from "./RequisitionItem"

type TreeLayoutProps = {
  requisitions: Requisition[]
}

export type RequisitionItemProps = {
  item: Requisition
  isLastItem: boolean
}

export const TreeLayout: FC<TreeLayoutProps> = ({ requisitions }) => {
  const haveChildren =
    requisitions && requisitions[0] && requisitions[0].children
  return (
    <div className="mb-6 px-4">
      <ul role="list" className="w-5/6 space-y-6">
        {haveChildren
          ? requisitions[0]?.children?.map(
              (
                requisitionItem: Requisition,
                requisitionItemIdx: number,
                arr
              ) => {
                const isLastItem = requisitionItemIdx === arr.length - 1
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
