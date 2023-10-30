"use server"

import { revalidatePath } from "next/cache"

import { Requisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"

/**
 *
 * @param formData
 */
export const editRequisitionAction = async (
  id: Requisition["id"],
  query: Requisition["query"]
) => {
  //   await new Promise((resolve) => setTimeout(resolve, 5000))
  await supabase.from("requisitions").update({ query }).eq("id", id)

  revalidatePath("/requisitions")
}

/**
 *
 * @returns
 */
export const getAllRequisitionsAction = async () => {
  const { data, error } = await supabase.from("requisitions").select("*")
  if (error) throw error
  return data
}
