import { FC, Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { Database } from "@/lib/database.types"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RequisitionForm } from "@/app/requisitions/_components/RequisitionForm"

interface RequisitionEditFormPageProps {
  params: { reqid: string }
}

const RequisitionFormPage: FC<RequisitionEditFormPageProps> = async ({
  params: { reqid },
}) => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select()

  // do a if not null check
  const tree = createRequisitionTree(requisitions as Requisition[])
  const instantHeading = findNodeByReqId(tree, parseInt(reqid))

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="relative h-screen ">
        <div className="sticky top-20 z-10">
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Update Requisition Details</CardTitle>
            </CardHeader>
            <CardContent>
              <RequisitionForm selectedNode={instantHeading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  )
}

export default RequisitionFormPage
