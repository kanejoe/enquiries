"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import type { Requisition } from "@/types/RequisitionType"
import type { Database } from "@/lib/database.types"

/**
 *
 * @param requisition
 */

type IdAndIsRequired = Pick<Requisition, "id" | "is_required">

export async function isRequiredAction(data: IdAndIsRequired) {
  const supabase = createServerActionClient<Database>({ cookies })

  try {
    const { error } = await supabase
      .from("requisitions")
      .update({ is_required: data.is_required })
      .eq("id", data.id)
    // revalidatePath("/requisitions/create")
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: `Things exploded (${err.message})`,
      }
    }
  }
}
