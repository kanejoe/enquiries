import { FC } from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"

import { EnhancedRequisition } from "@/types/RequisitionType"
import { sequenceFormat } from "@/lib/tree"
import { Badge } from "@/components/ui/badge"

import { DeleteRequisitionButton } from "./DeleteRequisitionButton"
import { RequisitionRowActions } from "./RequisitionRowActions"

export type RequisitionItemProps = {
  item: EnhancedRequisition
  isLastItem: boolean
}

// RequisitionItem component
export const RequisitionItem: FC<RequisitionItemProps> = ({
  item,
  isLastItem,
}) => {
  const hasChildren = item.children && item.children.length > 0
  return (
    <>
      <li className="group relative flex flex-row space-x-12 rounded focus-within:bg-primary/5 hover:bg-primary/5">
        <div className="relative flex w-8 justify-center">
          {/* vertical line */}
          {hasChildren ? (
            <div className="absolute -bottom-6 left-[59px] top-5 w-px bg-gray-200 group-focus-within:bg-primary group-hover:bg-primary" />
          ) : isLastItem ? null : (
            <div className="absolute -bottom-8 left-[59px] top-5 w-px bg-gray-200 group-focus-within:bg-primary group-hover:bg-primary" />
          )}

          {/* horizontal line */}
          <div className="absolute -right-6 bottom-2 left-8 top-4 h-px bg-gray-200 group-focus-within:bg-primary group-hover:bg-primary" />

          {/* circle */}
          <div className="absolute left-14 top-[13px]">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300 group-focus-within:bg-primary/25 group-focus-within:ring-primary group-hover:bg-primary/25 group-hover:ring-primary" />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 group-focus-within:bg-primary group-hover:bg-primary group-hover:text-foreground">
            {sequenceFormat(item.sequence_in_levels, item.level)}
          </div>
        </div>
        <div className="mt-1.5 w-full">
          <div className="inline-flex items-start">
            {item.query ? (
              <div className="text-pretty text-sm">
                {item.query}
                {item.is_required ? (
                  <CheckCircledIcon className="-mt-0.5 ml-2 inline-block text-secondary-foreground" />
                ) : null}
              </div>
            ) : (
              <Badge
                variant="outline"
                className="rounded py-0.5  group-hover:border-gray-400"
              >
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
            {item.children && item.children?.length > 0 ? null : (
              <DeleteRequisitionButton
                id={item.id}
                parent_id={item.parent_id}
              />
            )}
          </div>
        </div>
        <div className="w-1">
          <RequisitionRowActions requisition={item} />
        </div>
      </li>

      {/* recursive part */}
      {item.children && item.children.length > 0 && (
        <ul className="ml-11 space-y-4">
          {item.children.map(
            (
              requisitionItem: EnhancedRequisition,
              requisitionItemIdx: number,
              arr: EnhancedRequisition[]
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
          )}
        </ul>
      )}
    </>
  )
}
