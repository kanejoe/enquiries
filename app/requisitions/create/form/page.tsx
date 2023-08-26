import { FC } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { NewRequisitionForm } from "../../_components/NewRequisitionForm"

interface RequisitionFormPageProps {
  searchParams?: { pid?: string }
}

const RequisitionFormPage: FC<RequisitionFormPageProps> = ({
  searchParams,
}) => {
  return (
    <div>
      <div className="relative h-screen ">
        <div className="sticky top-20 z-10">
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Add a New Requisition</CardTitle>
            </CardHeader>
            <CardContent>
              <NewRequisitionForm parent_id={Number(searchParams?.pid)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RequisitionFormPage
