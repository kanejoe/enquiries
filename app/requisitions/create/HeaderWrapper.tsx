import { PlusCircledIcon } from "@radix-ui/react-icons"

import { EnhancedRequisition, Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, getHeaderNodes } from "@/lib/tree"
import { Button } from "@/components/ui/button"

import { getRequisitions } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { RequisitionHeadingList } from "./RequisitionHeaders"
import { StickyWrapper } from "./StickyWrapper"

interface HeaderWrapperProps {
  headingId: number
}

export async function HeaderWrapper({ headingId }: HeaderWrapperProps) {
  let requisitions: Requisition[]
  try {
    requisitions = await getRequisitions()
  } catch (error: unknown) {
    console.error(error)
    return <ErrorMessage message={(error as Error).message} />
  }

  const requisitionTree = createRequisitionTree(
    requisitions as EnhancedRequisition[]
  )
  const headerNodes = getHeaderNodes(requisitionTree)

  return (
    <>
      {!headerNodes || !headerNodes.length ? (
        <StickyWrapper>
          <div>nothing to see here</div>
        </StickyWrapper>
      ) : (
        <StickyWrapper
          footerComponent={<FooterComponent />}
          headerComponent={<HeaderComponent />}
        >
          <RequisitionHeadingList
            headerNodes={headerNodes}
            headingId={headingId}
          />
        </StickyWrapper>
      )}
    </>
  )
}

const HeaderComponent = () => {
  return (
    <div className="ml-6 mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">
      Headings
    </div>
  )
}

const FooterComponent = () => {
  return (
    <div className="flex h-full items-center justify-center rounded-b-xl bg-gray-50">
      <div className="mb-4">
        <Button className="w-96">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          New Heading Topic
        </Button>
      </div>
    </div>
  )
}
