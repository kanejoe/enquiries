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
  if (!id) {
    throw new Error("id is undefined")
  }
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

type RequisitionData = Pick<
  Requisition,
  "id" | "sequence" | "query" | "parent_id" | "is_required"
>

export const addRequisition = async (
  insert_data: Omit<RequisitionData, "id">
): Promise<RequisitionData> => {
  const { data, error } = await supabase
    .from("requisitions")
    .insert(insert_data)
    .single<RequisitionData>()
  console.log("🚀 ~ file: actions.ts:47 ~ data:", data)

  if (error) {
    console.log("🚀 ~ file: actions.ts:49 ~ error:", error)
    throw error
  }

  // Assuming data is of type RequisitionData, otherwise handle the possibility of null
  if (!data) throw new Error("No data returned after insert operation.")

  return data
}
