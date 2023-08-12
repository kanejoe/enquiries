"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database.types"
import { Requisition } from "@/types/RequisitionType"

/**
 *
 * @param formData
 */
const editRequisitionAction = async (
  id: Requisition["id"],
  query: Requisition["query"]
) => {
  //   await new Promise((resolve) => setTimeout(resolve, 5000))
  const supabase = createServerActionClient<Database>({ cookies })
  await supabase.from("requisitions").update({ query }).eq("id", id)

  revalidatePath("/requisitions")
}

export { editRequisitionAction }
