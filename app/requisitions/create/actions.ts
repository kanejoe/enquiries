"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"

/**
 *
 * @param formData
 */
const editRequisitionAction = async (id, query) => {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const supabase = createServerActionClient({ cookies })
  await supabase.from("requisitions").update({ query }).eq("id", id)

  revalidatePath("/requisitions")
}

export { editRequisitionAction }
