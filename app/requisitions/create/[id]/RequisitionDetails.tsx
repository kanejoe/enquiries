"use client"

import { Button, Callout, Text } from "@radix-ui/themes"

import { Requisition } from "@/types/RequisitionType"

interface RequisitionDetailsProps {
  data: Requisition
}

const RequisitionContainer: React.FC<RequisitionDetailsProps> = ({ data }) => {
  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <p>ID: {data.id}</p>

      <Callout.Root variant="outline">
        <Callout.Text>{data.query}</Callout.Text>
      </Callout.Root>
      <p className="">
        <Button>Edit</Button>
      </p>
    </div>
  )
}

export { RequisitionContainer }
