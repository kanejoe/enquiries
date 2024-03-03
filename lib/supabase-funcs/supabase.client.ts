import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/database.types"

export const supabaseClient = createClientComponentClient<Database>()

export const getStorageObjectPathByObjectId = async (
  storage_object_id: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabaseClient
      .from("documents_with_storage_path_and_created_by_email")
      .select("storage_object_path")
      .eq("storage_object_id", storage_object_id)
      .single()

    if (error) {
      console.log("🚀 ~ error:", error)
      //   throw new Error(error.message)
    }

    return data?.storage_object_path || null
  } catch (error) {
    console.error("Error retrieving storage object path:", error)
    return null
  }
}

export const createSignedUrl = async (
  storageObjectPath: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabaseClient.storage
      .from("files")
      .createSignedUrl(storageObjectPath || "", 60)

    if (error) {
      console.log("🚀 ~ error:", error)
      // throw new Error(error.message)
    }

    return data?.signedUrl || null
  } catch (error) {
    console.error("Error creating signed URL:", error)
    return null
  }
}
