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
export async function findSiblingsReqsByParentId(
  parent_id: RequisitionData["parent_id"]
): Promise<RequisitionData[] | null> {
  if (!parent_id) {
    throw new Error("Get operation did not return a parent_id.")
  }

  // Now, use the parent_id to find all matching records
  const allRecordsResponse = await supabase
    .from("requisitions")
    .select("id, sequence, query, parent_id, is_required")
    .eq("parent_id", parent_id)

  if (allRecordsResponse.error) {
    // Handle the error
    throw new Error(
      `Insert operation failed: ${allRecordsResponse.error.message}`
    )
  } else {
    // Here's your data with the same parent_id
    const recordsWithSameParentId = allRecordsResponse.data
    return recordsWithSameParentId
  }
}
