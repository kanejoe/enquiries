import { FC } from "react"

import { Requisition } from "@/types/RequisitionType"
import { sequenceFormat } from "@/lib/tree"
import { Badge } from "@/components/ui/badge"

import { RequisitionRowActions } from "./requisition-row-actions"

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
  return (
    <>
      <li className="group relative flex flex-row space-x-12 rounded hover:bg-primary/5">
        <div className="relative flex w-8 justify-center">
          {/* vertical line */}
          {hasChildren ? (
            <div className="absolute -bottom-6 left-[59px] top-5 w-px bg-gray-200 group-hover:bg-primary" />
          ) : isLastItem ? null : (
            <div className="absolute -bottom-8 left-[59px] top-5 w-px bg-gray-200 group-hover:bg-primary" />
          )}

          {/* horizontal line */}
          <div className="absolute -right-6 bottom-2 left-8 top-4 h-px bg-gray-200 group-hover:bg-primary" />

          {/* circle */}
          <div className="absolute left-14 top-[13px]">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300 group-hover:bg-primary/25 group-hover:ring-primary" />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 group-hover:bg-primary/30 group-hover:text-foreground">
            {sequenceFormat(item.sequence_in_levels, item.level)}
          </div>
        </div>
        {item.query ? (
          <div className="mt-1.5 w-full text-balance text-sm">{item.query}</div>
        ) : (
          <Badge variant="outline" className="rounded py-0">
            <svg
              className="mr-1.5 mt-0.5 h-1.5 w-1.5 fill-primary"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="3"></circle>
            </svg>
            no text
          </Badge>
        )}
        <div className="w-1 flex-none">
          <RequisitionRowActions requisition={item} />
        </div>
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
