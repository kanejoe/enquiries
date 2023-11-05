/**
 * FILEPATH: /c:/Users/JKCo1/Documents/webdev/enquiries/app/requisitions/_actions/bulkUpdateReqs.ts
 *
 * Updates multiple requisitions in the database with the given data.
 *
 * @param insert_data - An array of objects containing the data to update each requisition with.
 * @throws An error if no data is provided or if any record in the data array is missing an ID.
 * @returns Nothing. If successful, the function will revalidate the "/requisitions" path and return.
 */
// import { revalidatePath } from "next/cache"

import { Requisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"

export type RequisitionData = Pick<
  Requisition,
  "id" | "sequence" | "query" | "parent_id" | "is_required"
>

export async function bulkUpdate(insert_data: RequisitionData[]) {
  if (!insert_data) {
    throw new Error("No data to insert")
  }
  if (!insert_data.every((record) => record.id)) {
    throw new Error("All records must have an ID")
  }

  for (const record of insert_data) {
    const { data, error } = await supabase
      .from("requisitions")
      .update({ sequence: record.sequence }) // the field you want to update
      .eq("id", record.id) // the condition to match the row

    if (error) {
      console.error("Error updating record with ID:", record.id, error)
      throw new Error(`Insert operation failed: ${error.message}`)
    }
  }
  // do the below in the insert or update function
  // revalidatePath("/requisitions")
  return
}
