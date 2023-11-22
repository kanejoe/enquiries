import { FC } from "react"

import { EnhancedRequisition } from "@/types/RequisitionType"
import { sequenceFormat } from "@/lib/tree"
import { Badge } from "@/components/ui/badge"

import { DeleteRequisitionButton } from "./DeleteRequisitionButton"
// import { IsRequiredIcon } from "./IsRequiredReq"
import { ItemLines } from "./ItemLines"
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
      <li className="group relative flex space-x-12 rounded transition duration-300 hover:bg-primary/5">
        {/* <!-- Fixed width left column --> */}
        <div className="relative flex w-8 justify-center">
          <ItemLines hasChildren={hasChildren} isLastItem={isLastItem} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition duration-300 group-focus-within:bg-primary group-hover:bg-primary group-hover:text-foreground">
            {sequenceFormat(item.sequence_in_levels, item.level)}
          </div>
        </div>
        <div className="mt-1.5 w-full flex-grow">
          <div className="inline-flex items-start">
            {item.query ? (
              <div className="text-pretty hyphens-auto whitespace-break-spaces text-sm">
                {item.is_required ? null : (
                  <Badge
                    variant="outline"
                    className="mr-3 rounded py-0.5 group-hover:border-gray-400"
                  >
                    <svg
                      className="mr-1.5 mt-0.5 h-1.5 w-1.5 fill-primary/50"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx="3" cy="3" r="3"></circle>
                    </svg>
                    no reply required
                  </Badge>
                )}
                <span
                  className={`${
                    item.is_required
                      ? ""
                      : "font-semibold uppercase leading-relaxed"
                  }`}
                >
                  {item.query}
                </span>
                {/* <IsRequiredIcon isRequired={item.is_required} /> */}
              </div>
            ) : (
              <Badge
                variant="outline"
                className="rounded py-0.5 group-hover:border-gray-400"
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
          </div>
        </div>
        {/* <!-- Fixed width right column containing the option buttons --> */}
        <div className="w-4 flex-shrink-0">
          <div className="flex w-full items-center justify-center space-x-2">
            <div className="w-8 shrink-0">
              {item.children && item.children?.length > 0 ? null : (
                <DeleteRequisitionButton
                  id={item.id}
                  parent_id={item.parent_id}
                />
              )}
            </div>
            <div className="w-2">
              <RequisitionRowActions requisition={item} />
            </div>
          </div>
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
