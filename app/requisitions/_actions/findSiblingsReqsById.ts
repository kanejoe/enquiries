"use server"

import { Requisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"

export type RequisitionData = Pick<
  Requisition,
  "id" | "sequence" | "query" | "parent_id" | "is_required"
>

/**
 * Finds all siblings of the given ID.
 *
 * @param items - The list of items to search.
 * @param idToFind - The ID of the item whose siblings should be found.
 * @returns A list of items that have the same parent ID as the given ID.
 */
export async function findSiblingsReqsById(
  id: RequisitionData["id"]
): Promise<RequisitionData[] | null> {
  if (!id) {
    throw new Error("findSiblingsReqsById was not passed an ID.")
  }
  const singleRecordResponse = await supabase
    .from("requisitions")
    .select("parent_id")
    .eq("id", id)
    .single()

  if (singleRecordResponse.error) {
    // Handle the error
    throw new Error(
      `Insert operation failed: ${singleRecordResponse.error.message}`
    )
  } else {
    const parentId = singleRecordResponse.data.parent_id

    // Now, use the parent_id to find all matching records
    let allRecordsResponse = supabase
      .from("requisitions")
      .select("id, sequence, query, parent_id, is_required")

    if (parentId === null) {
      // Fetch records where parent_id is null
      allRecordsResponse = allRecordsResponse.is("parent_id", null)
    } else {
      // Fetch records where parent_id matches the given parentId
      allRecordsResponse = allRecordsResponse.eq("parent_id", parentId)
    }

    const { data: allRecordsData, error: errAllRecordsResponse } =
      await allRecordsResponse

    if (errAllRecordsResponse) {
      // Handle the error
      throw new Error(`Insert operation failed: ${allRecordsResponse}`)
    } else {
      // Here's your data with the same parent_id
      // const recordsWithSameParentId = allRecordsResponse.data
      return allRecordsData
    }
  }
}
