"use server"

import { Requisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"

export type RequisitionData = Pick<
  Requisition,
  "id" | "sequence" | "query" | "parent_id" | "is_required"
>

export const insertRequisition = async (
  insert_data: Omit<RequisitionData, "id">
): Promise<RequisitionData> => {
  const { data, error } = await supabase
    .from("requisitions")
    .insert(insert_data)
    .select("id, sequence, query, parent_id, is_required") // Specify the fields you want to return
    .single() // Use `.single()` if you're inserting one row to get an object instead of an array

  if (error) {
    throw new Error(`Insert operation failed: ${error.message}`)
  }

  if (!data || !data.id) {
    throw new Error("Insert operation did not return an ID.")
  }

  // Assuming data is of type RequisitionData, otherwise handle the possibility of null
  if (!data) throw new Error("No data returned after insert operation.")

  return data
}
