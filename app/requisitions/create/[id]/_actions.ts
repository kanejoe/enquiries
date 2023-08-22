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
    "🚀 ~ file: _actions.ts:18 ~ addEntry ~ existingReq.parent_id:",
    existingReq?.parent_id
  )

  const { data: updatedData, error: updatedDataError } = await (
    supabase.rpc as any
  )("increment", {
    p_parent_id: existingReq?.parent_id,
  })

  if (updatedDataError) {
    console.error("Error updating rows:", updatedDataError)
  } else {
    console.log("Updated rows:", updatedData)
  }
}
