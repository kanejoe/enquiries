"use server"

import { revalidatePath } from "next/cache"

import { Requisition } from "@/types/RequisitionType"
import { ensureUniqueSequence } from "@/lib/sequenceUtils"
import { supabase } from "@/lib/supabase"

import { bulkUpdate } from "./bulkUpdateReqs"
import { findSiblingsReqsByParentId } from "./findSiblingsByParentId"

export async function deleteRequisition(
  deleteId: Requisition["id"],
  parent_id: Requisition["parent_id"]
) {
  const { data, error } = await supabase
    .from("requisitions")
    .delete()
    .eq("id", deleteId)
    .select("*")

  if (error) {
    throw new Error(`Delete operation failed: ${error.message}`)
  }

  try {
    const siblings = await findSiblingsReqsByParentId(parent_id)
    if (siblings) {
      const madeUnique = ensureUniqueSequence(siblings)
      await bulkUpdate(madeUnique)
    }
  } catch (error: unknown) {
    console.log(
      "🚀 ~ file: deleteRequisition.ts:41 ~ deleteRequisition ~ error:",
      error
    )
    throw new Error(
      `Re-sequencing operation failed: ${(error as Error).message}`
    )
  }

  revalidatePath("/requisitions")
  return data
}
