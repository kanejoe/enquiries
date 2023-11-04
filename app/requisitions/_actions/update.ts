"use server"

import { revalidatePath } from "next/cache"

import { Requisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"

type SelectedRequisitionProps = Pick<
  Requisition,
  "id" | "sequence" | "query" | "parent_id"
>

/**
 *
 * @param requisition
 */
export async function updateRequisition(requisition: SelectedRequisitionProps) {
  const { data: existingReq, error: existingReqError } = await supabase
    .from("requisitions")
    .select()
    .filter("id", "eq", requisition.id)
    .single()

  const oldSequence = existingReq?.sequence // original sequence before the update
  const newSequence = Number(requisition.sequence)

  const updateRequisition = async (
    id: Requisition["id"],
    parent_id: Requisition["parent_id"],
    query: Requisition["query"],
    newSequence: number,
    oldSequence: number | undefined
    // is_required: Requisition["is_required"]
  ) => {
    try {
      let { _, error } = await (supabase.rpc as any)("update_requisition", {
        p_id: id,
        p_new_sequence: newSequence,
        p_old_sequence: oldSequence,
        p_parent_id: parent_id,
        p_query: query,
      })

      if (error) {
        console.error(
          "Error calling the adjust_sequence function:",
          error.message
        )
      } else {
        console.log("updated successfully")
        // revalidatePath("/requisitions/create")
        revalidatePath("/")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return {
          message: `Things exploded (${err.message})`,
        }
      }
    }
  }

  if (existingReq?.sequence && typeof existingReq.sequence !== undefined) {
    await updateRequisition(
      requisition.id,
      requisition.parent_id ?? null,
      requisition.query,
      newSequence,
      // is_required,
      oldSequence
    )
  }
}
