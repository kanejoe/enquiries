import { FC, Suspense } from "react"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"

interface EditRequisitionFormProps {
  requisition: Requisition
}

const EditRequisitionForm: FC<EditRequisitionFormProps> = ({ requisition }) => {
  const editRequisition = async (formData: FormData) => {
    "use server"
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    const query = formData.get("query")
    const supabase = createServerActionClient({ cookies })
    await supabase
      .from("requisitions")
      .update({ query })
      .eq("id", requisition.id)
    revalidatePath("/requisitions")
  }

  return (
    <form action={editRequisition}>
      <Suspense fallback={<p>loading...</p>}>
        <legend>
          {requisition.sequence} {requisition.query}
        </legend>
      </Suspense>
      <input
        type="text"
        name="query"
        className=""
        defaultValue={requisition.query}
      />
      <button type="submit">+</button>
    </form>
  )
}

export { EditRequisitionForm }
