"use client"

import { FC } from "react"

import { Requisition } from "@/types/RequisitionType"
import { sequenceFormat } from "@/lib/tree"

type TreeLayoutProps = {
  requisitions: Requisition[]
}

type RequisitionItemProps = {
  item: Requisition
  isLastItem: boolean
}

// RequisitionItem component
const RequisitionItem: FC<RequisitionItemProps> = ({ item, isLastItem }) => {
  const hasChildren = item.children && item.children.length > 0
  //   console.log("🚀 ~ file: TreeLayout.tsx:20 ~ hasChildren:", hasChildren)
  return (
    <>
      <li className="relative flex flex-row space-x-12">
        <div className="relative flex w-8 justify-center">
          {/* vertical line */}
          {hasChildren ? (
            <div className="absolute -bottom-6 left-[59px] top-5 w-px bg-gray-200" />
          ) : isLastItem ? null : (
            <div className="absolute -bottom-8 left-[59px] top-5 w-px bg-gray-200" />
          )}

          {/* horizontal line */}
          <div className="absolute -right-6 bottom-0 left-8 top-4 h-px bg-gray-200" />

          {/* circle */}
          <div className="absolute left-14 top-[13px]">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            {sequenceFormat(item.sequence_in_levels, item.level)}
          </div>
        </div>
        <div className="text-balance mt-1.5 text-sm">{item.query}</div>
      </li>

      {/* recursive part */}
      {item.children && item.children.length > 0 && (
        <ul className="ml-11 space-y-4">
          {item.children.map(
            (requisitionItem: Requisition, requisitionItemIdx: number, arr) => {
              const isLastItem = requisitionItemIdx === arr.length - 1
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
      )}
    </>
  )
}

export const TreeLayout: FC<TreeLayoutProps> = ({ requisitions }) => {
  const haveChildren =
    requisitions && requisitions[0] && requisitions[0].children
  return (
    <div>
      <h2 className="mb-8 text-xl font-bold text-gray-700">
        {requisitions[0]?.query}
      </h2>
      <ul role="list" className="flex w-4/5 flex-col space-y-6">
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
