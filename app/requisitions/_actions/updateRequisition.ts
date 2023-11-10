"use server"

import { revalidatePath } from "next/cache"

import { Requisition } from "@/types/RequisitionType"
import { ensureUniqueSequence } from "@/lib/sequenceUtils"
import { supabase } from "@/lib/supabase"

import { bulkUpdate } from "./bulkUpdateReqs"
import { findSiblingsReqsById } from "./findSiblingsReqsById"

export type RequisitionData = Pick<
  Requisition,
  "id" | "sequence" | "query" | "parent_id" | "is_required"
>

export async function updateRequisition(
  update_data: RequisitionData
): Promise<RequisitionData[]> {
  const { id, ...rest } = update_data
  const { data, error } = await supabase
    .from("requisitions")
    .update(rest)
    .eq("id", update_data.id)
    .select("id, sequence, query, parent_id, is_required") // Specify the fields you want to return

  if (error) {
    throw new Error(`Insert operation failed: ${error.message}`)
  }

  // Assuming data is of type RequisitionData, otherwise handle the possibility of null
  if (!data) throw new Error("No data returned after insert operation.")

  try {
    const siblings = await findSiblingsReqsById(id)
    if (siblings) {
      const madeUnique = ensureUniqueSequence(siblings, id)
      await bulkUpdate(madeUnique)
    }
  } catch (error: unknown) {
    throw new Error(`Insert operation failed: ${(error as Error).message}`)
  }

  revalidatePath("/requisitions")
  return data
}
