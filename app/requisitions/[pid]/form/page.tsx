import { FC } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { NewRequisitionForm } from "../../_components/NewRequisitionForm"

interface RequisitionFormPageProps {
  searchParams?: { pid?: string; sequence?: string; siblings?: string }
}

const RequisitionFormPage: FC<RequisitionFormPageProps> = ({
  searchParams,
}) => {
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle>Add a New Requisition</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <NewRequisitionForm
          parent_id={Number(searchParams?.pid)}
          sequence={Number(searchParams?.sequence)}
          siblings={searchParams?.siblings?.split(",").map(Number)}
        /> */}
      </CardContent>
    </Card>
  )
}

export default RequisitionFormPage
