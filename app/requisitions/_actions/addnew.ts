"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/lib/database.types"

/**
 *
 * @param requisition
 */

type NewRequistion = {
  parent_id?: number | null | undefined
  query?: string | null | undefined
  sequence: string
}

export async function addEntry(newRequistion: NewRequistion) {
  const supabase = createServerActionClient<Database>({ cookies })

  const addRequisition = async (
    parent_id: number | null | undefined,
    query: string | null | undefined,
    sequence: number
  ) => {
    try {
      let { data, error } = await (supabase.rpc as any)(
        "insert_and_resequence",
        {
          p_parent_id: parent_id,
          p_query: query,
          p_sequence: sequence,
        }
      )

      if (error) {
        console.error(
          "Error calling the insert_and_resequence function:",
          error.message
        )
      } else {
        console.log("added requisition successfully")
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

  await addRequisition(
    newRequistion.parent_id,
    newRequistion.query,
    Number(newRequistion.sequence)
  )
}
