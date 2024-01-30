import { cache } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database, Tables } from "@/lib/database.types"

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
)

export async function getUserDetails() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: userDetails } = await supabase
      .from("profiles")
      .select("*")
      .single()
    return userDetails
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export async function getDocumentById({
  id,
}: Pick<Tables<"documents">, "id">): Promise<Tables<"documents"> | null> {
  const supabase = createServerSupabaseClient()

  try {
    const { data: document } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single()
    return document
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message)
      throw new Error(error.message)
    } else {
      console.error("An unknown error occurred:", error)
      throw new Error("An unknown error occurred")
    }
  }
}
