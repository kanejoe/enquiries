// import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import diacritics from "diacritics"

import { Database, Tables } from "@/lib/database.types"

import { keys } from "./keys"

type TDocuments = Tables<"documents">

type Input = {
  selectedFile: File
  folder_id: string
}

const fetchStorageFiles = async () => {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from("documents_with_storage_path_and_created_by_email")
    .select()
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message) // Throw an error if the query fails
  }

  // If no error, return the data
  return data
}

const useStorageFiles = () => {
  return useQuery({
    queryKey: keys.getFiles,
    queryFn: () => fetchStorageFiles(),
    retry: false,
  })
}

// Method to access the files data
const getUploadedFilesData = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueriesData({ queryKey: keys.getFiles })
}

const useAddStorageFile = (options: {
  onSuccess: (data: TDocuments) => void
  onError?: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()

  const queryClient = useQueryClient()
  return useMutation<TDocuments, Error, Input>({
    mutationFn: async (input: Input): Promise<TDocuments> => {
      const { selectedFile, folder_id } = input
      const { data, error } = await supabase.storage
        .from("files")
        .upload(
          `${crypto.randomUUID()}/${removeInvalidCharacters(selectedFile.name)}`,
          selectedFile,
          {
            upsert: true,
          }
        )

      if (error) {
        console.log("🚀 ~ mutationFn: ~ error:", error)
        throw new Error(error.message) // Throw an error if the addition fails
      }

      const { data: document, error: documentError } = await supabase
        .from("documents")
        .update({ folder_id: parseInt(folder_id, 10) })
        .eq("storage_object_id", (data as any).id)
        .select()
        .single()

      if (!document || document === null)
        throw new Error("Invalid data. No document found")

      if (documentError) {
        console.log("🚀 ~ mutationFn: ~ documentError:", documentError)
        throw new Error(documentError) // Throw an error if the addition fails
      }

      // Return a Response object
      return document
    },
    onSuccess: async (data: any) => {
      queryClient.invalidateQueries({ queryKey: keys.getDocuments })
      options.onSuccess(data)
    },
    onError: (error: Error) => options.onError && options.onError(error),
  })
}

const useFetchStorageFileUrl = (id: TDocuments["id"]) => {
  const supabase = createClientComponentClient<Database>()

  return useQuery({
    queryKey: ["file", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents_with_storage_path_and_created_by_email")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        throw new Error(error.message) // Throw an error if the query fails
      }

      if (!data || data?.storage_object_path === null) {
        throw new Error("Failed to find document")
      }

      const { data: file } = await supabase.storage
        .from("files")
        .createSignedUrl(data.storage_object_path || "", 60)

      if (!file) {
        throw new Error("Failed to download storage object.")
      }

      return file
    },
    retry: false,
  })
}

const useFetchStorageFileDownload = (id: TDocuments["id"]) => {
  const supabase = createClientComponentClient<Database>()

  return useQuery({
    queryKey: ["file", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents_with_storage_path_and_created_by_email")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        throw new Error(error.message) // Throw an error if the query fails
      }

      if (!data || data?.storage_object_path === null) {
        throw new Error("Failed to find document")
      }

      const { data: file } = await supabase.storage
        .from("files")
        .download(data.storage_object_path || "")

      if (!file) {
        throw new Error("Failed to download storage object.")
      }

      return file
    },
    retry: 3,
  })
}

const useDownloadStorageFile = (path: string) => {
  const supabase = createClientComponentClient<Database>()

  const downloadFile = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("files")
        .download(path)
      if (error) {
        throw new Error(error.message)
      }
      return data
    } catch (error) {
      throw new Error("Failed to download file")
    }
  }

  return downloadFile
}

export {
  useStorageFiles,
  useAddStorageFile,
  getUploadedFilesData,
  useFetchStorageFileUrl,
  useFetchStorageFileDownload,
  useDownloadStorageFile,
}

/**
 * replaces a string if it contains invalid characters
 * @param key
 */
export function removeInvalidCharacters(key: string): string {
  // Remove diacritics from the key\
  const keyWithoutDiacritics = diacritics.remove(key)

  // Regular expression to match invalid characters
  const invalidCharRegex = /[^\w\/!-\.\\*\(\)' &\$@=;:+,\?]/g

  // Replace all invalid characters with an empty string
  return keyWithoutDiacritics.replace(invalidCharRegex, "")
}
