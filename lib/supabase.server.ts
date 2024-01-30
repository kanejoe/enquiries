import { cache } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database, Tables } from "@/lib/database.types"

type Views<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"]
type StorageView = Views<"documents_with_storage_path_and_created_by_email">
type DocumentsTable = Tables<"documents">

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

export async function getDocumentById(
  id: DocumentsTable["id"]
): Promise<Tables<"documents"> | null> {
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

export async function getStoragePathByDocumentId(
  id: StorageView["id"]
): Promise<StorageView | null> {
  if (id === null) {
    throw new Error("Invalid id")
  }

  const supabase = createServerSupabaseClient()

  try {
    const { data } = await supabase
      .from("documents_with_storage_path_and_created_by_email")
      .select("*")
      .eq("id", id)
      .single()
    return data
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
