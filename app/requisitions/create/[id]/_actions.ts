"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/lib/database.types"

export async function addEntry(requisition: any) {
  const req = { ...requisition, sequence: Number(requisition.sequence) }

  const supabase = createServerActionClient<Database>({ cookies })

  const { data: existingReq, error: existingReqError } = await supabase
    .from("requisitions")
    .select()
    .filter("id", "eq", req.id)
    .single()

  console.log(
    "🚀 ~ file: _actions.ts:18 ~ addEntry ~ existingReq:",
    existingReq
  )

  const { data: updatedData, error: updatedDataError } = await (
    supabase.rpc as any
  )("add_sequence", {
    p_parent_id: existingReq?.parent_id,
    p_sequence_threshold: existingReq?.sequence,
  })

  if (updatedDataError) {
    console.error("Error updating rows:", updatedDataError)
  } else {
    console.log("Updated rows:", updatedData)
  }
}
