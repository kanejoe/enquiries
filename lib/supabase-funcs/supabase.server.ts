import { cache } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database, Tables } from "@/lib/database.types"

type Views<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"]
type StorageView = Views<"documents_with_storage_path_and_created_by_email">
type DocumentsTable = Tables<"documents">
type DocumentSectionsTable = Tables<"document_sections">
type ChatQueriesTable = Tables<"chatqueries">

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

/**
 * Retrieves a document from the "documents" table by its ID.
 * @param id The ID of the document to retrieve.
 * @returns A promise that resolves to the retrieved document, or null if not found.
 * @throws If an error occurs during the retrieval process.
 */
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

/**
 * Retrieves the storage path by document ID from the Supabase server.
 *
 * @param id - The ID of the document.
 * @returns A promise that resolves to the storage view object if found, or null if not found.
 * @throws Error if the ID is invalid or if an error occurs during the retrieval process.
 */
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

    if (!data || data?.storage_object_path === null) {
      throw new Error("Failed to find document")
    }

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

/**
 * Retrieves the file from the Supabase storage using the provided storage object path.
 *
 * @param storage_object_path - The path of the storage object.
 * @returns The downloaded file.
 * @throws Error if the storage_object_path is invalid, or if there is an error downloading the file.
 */
export async function getFileByStorageObjectPath(
  storage_object_path: StorageView["storage_object_path"]
) {
  if (storage_object_path === null) {
    throw new Error("Invalid storage_object_path")
  }

  const supabase = createServerSupabaseClient()

  try {
    const { data: file } = await supabase.storage
      .from("files")
      .download(storage_object_path)

    if (!file) {
      throw new Error("Failed to download storage object.")
    }

    return file
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

type upsertData = Pick<
  Tables<"document_sections">,
  "content" | "document_id" | "metadata"
>

/**
 * Upserts document sections into the "document_sections" table.
 *
 * @param upsertData - The data to be upserted.
 * @param document_id - The ID of the document.
 * @returns The upserted data.
 * @throws Error if an error occurs during the upsert process.
 */
export async function upsertDocumentSections(
  upsertData: upsertData[],
  document_id: Tables<"document_sections">["document_id"]
) {
  const supabase = createServerSupabaseClient()
  try {
    // Check if the row exists
    const { data: existingRows, error: selectError } = await supabase
      .from("document_sections")
      .select("*")
      .eq("document_id", document_id)

    if (existingRows && existingRows.length > 0) {
      await supabase
        .from("document_sections")
        .delete()
        .eq("document_id", document_id)
    }

    const { data } = await supabase
      .from("document_sections")
      .upsert(upsertData)
      .throwOnError()
      .select("*")
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

/**
 * Retrieves the name of a document from the "documents" table by its ID.
 * @param id The ID of the document to retrieve the name for.
 * @returns A promise that resolves to the name of the document, or null if not found.
 * Retrieves document sections from the "document_sections" table by document ID.
 */
export async function getDocumentNameById(id: DocumentsTable["id"]): Promise<string | null> {
  const supabase = createServerSupabaseClient();

  try {
    const { data: document } = await supabase
      .from("documents")
      .select("name")
      .eq("id", id)
      .single();
    return document?.name || null;
  } catch (error: unknown) {
    if (error instanceof Error) { /* Handle error */ }
    return null;
  }
}


export async function getDocumentSectionsByDocumentId(
  document_id: Tables<"document_sections">["document_id"]
) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: documentSections } = await supabase
      .from("document_sections")
      .select("*")
      .eq("document_id", document_id)
    return documentSections
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

/**
 * Retrieves all tags from the Supabase database.
 * @returns {Promise<Array<any>>} The array of tags.
 * @throws {Error} If there is an error retrieving the tags.
 */
export async function getTags(): Promise<Array<any>> {
  const supabase = createServerSupabaseClient()
  const { data: tags, error } = await supabase.from("tags").select("*")
  if (error) {
    throw new Error(error.message)
  }
  return tags
}

/**
 * Inserts embeddings into a specified table in the Supabase database.
 *
 * @param table - The name of the table to insert the embeddings into.
 * @param embeddingColumn - The name of the column in the table that will store the embeddings.
 * @param documentId - The ID of the document to associate the embeddings with.
 * @param embeddingResponse - An array of numbers representing the embeddings to be inserted.
 * @returns A Promise that resolves to the updated document sections table.
 * @throws An error if there is a problem saving the embeddings.
 */
export async function insertEmbeddings(
  table: string,
  embeddingColumn: string,
  documentId: DocumentSectionsTable["id"],
  embeddingResponse: number[]
): Promise<DocumentSectionsTable> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from(table)
    .update({
      [embeddingColumn]: embeddingResponse as any,
      isvectorized: true,
    })
    .eq("id", documentId)

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Failed to save embedding")
  }

  return data
}

/**
 * Inserts chat queries into the "chat_queries" table in the Supabase database.
 *
 * @param payload - The data to be inserted.
 * @returns A Promise that resolves to the inserted data.
 * @throws An error if there is a problem inserting the chat queries.
 */
export async function insertChatQueries(payload: {
  message_id: string
  title: string
  path: string
  messages: {
    role: string
    content: string
  }[]
}): Promise<ChatQueriesTable> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("chatqueries")
    .insert([{ ...payload }])
    .select()
    .single()

  if (error) {
    console.log("🚀 ~ error:", error.message)
    console.log("🚀 ~ error:", error.code)
    // console.log("🚀 ~ error:", error.details)
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Failed to save chat query (no data returned).")
  }

  return data
}

/**
 * Retrieves a chat query from the "chat_queries" table by its message_id.
 * @param message_id The message_id of the chat query to retrieve.
 * @returns A promise that resolves to the retrieved chat query, or null if not found.
 * @throws If an error occurs during the retrieval process.
 */
export async function getChatQueryByMessageId(
  message_id: ChatQueriesTable["message_id"]
): Promise<ChatQueriesTable | null> {
  const supabase = createServerSupabaseClient()

  try {
    const { data: chatQuery } = await supabase
      .from("chatqueries")
      .select("*")
      .eq("message_id", message_id)
      .single()
    return chatQuery
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

/**
 * Retrieves all chats from the "chatqueries" table.
 * @returns A promise that resolves to an array of all chats.
 * @throws If an error occurs during the retrieval process.
 */
export async function getAllChats(): Promise<ChatQueriesTable[]> {
  const supabase = createServerSupabaseClient()

  try {
    const { data: chats } = await supabase.from("chatqueries").select("*")
    return chats || []
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

/**
 * Removes a chat query from the "chat_queries" table by its ID.
 * @param id The ID of the chat query to remove.
 * @returns A promise that resolves to true if the chat query was successfully removed, or false if not found.
 * @throws If an error occurs during the removal process.
 */
export async function removeChatQueryById(
  id: ChatQueriesTable["id"]
): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  try {
    const { data } = await supabase.from("chatqueries").delete().eq("id", id)

    if (data && (data as unknown as any[]).length > 0) {
      return true
    } else {
      return false
    }
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
