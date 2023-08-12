import { FC, Fragment } from "react"

import { HeadingRequisition } from "@/types/RequisitionType"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface HeadingScrollAreaProps {
  headers: HeadingRequisition[]
}

const HeadingScrollArea: FC<HeadingScrollAreaProps> = ({
  headers,
}: HeadingScrollAreaProps) => {
  return (
    <ScrollArea className="h-108 w-72 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Headings</h4>
        {headers?.map((node: HeadingRequisition) => (
          <Fragment key={node.id}>
            <div className="flex">
              <div className="text-sm">{node.formatted_sequence}</div>
              <div className="text-sm">{node.query}</div>
            </div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

export { HeadingScrollArea }
