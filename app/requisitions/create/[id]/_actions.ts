"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import type { Database } from "@/lib/database.types"

/**
 *
 * @param requisition
 */
export async function addEntry(requisition: Requisition) {
  const supabase = createServerActionClient<Database>({ cookies })
  const { data: existingReq, error: existingReqError } = await supabase
    .from("requisitions")
    .select()
    .filter("id", "eq", requisition.id)
    .single()

  const oldSequence = existingReq?.sequence // original sequence before the update
  const newSequence = Number(requisition.sequence)

  const updateRequisition = async (
    id: number,
    parent_id: number | null | undefined,
    query: string | null | undefined,
    newSequence: number,
    oldSequence: number | undefined
  ) => {
    try {
      let { data, error } = await (supabase.rpc as any)("update_requisition", {
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
        revalidatePath("/requisitions/create")
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
      oldSequence
    )
  }
}
