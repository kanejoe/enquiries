import { FC, Fragment } from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database.types"
import { HeadingRequisition } from "@/types/RequisitionType"
import { createRequisitionTree, getHeaderNodes } from "@/lib/tree"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface HeadingScrollAreaProps {}

const HeadingScrollArea: FC<
  HeadingScrollAreaProps
> = async ({}: HeadingScrollAreaProps) => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select()

  if (error) {
    console.error("Error fetching requisitions:", error)
    // You might want to handle this in another way depending on your app's needs.
  }

  const requisitionTree = Array.isArray(requisitions)
    ? createRequisitionTree(requisitions)
    : []

  const headers = Array.isArray(requisitionTree)
    ? getHeaderNodes(requisitionTree)
    : []

  return (
    <ScrollArea className="h-108 w-72 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Headings</h4>
        {headers
          ? headers?.map((node: HeadingRequisition) => (
              <Fragment key={node.id}>
                <Link href={`/requisitions/create/${node.id}`}>
                  <div className="flex flex-row">
                    <div className="w-8 text-sm">{node.level_sequence}</div>
                    <div className="text-sm">{node.query}</div>
                  </div>
                </Link>
                <Separator className="my-2" />
              </Fragment>
            ))
          : null}
      </div>
    </ScrollArea>
  )
}

export { HeadingScrollArea }
