// import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import diacritics from "diacritics"
import mammoth from "mammoth"

import { Database, Tables } from "@/lib/database.types"

type TDocuments = Tables<"documents">

const keys = {
  getFiles: ["files"],
  getDocuments: ["documents"],
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

type Input = {
  selectedFile: File
  folder_id: string
}

type Response = Tables<"documents">

const useAddStorageFile = (options: {
  onSuccess: (data: Response) => void
  onError?: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()

  const queryClient = useQueryClient()
  return useMutation<Response, Error, Input>({
    mutationFn: async (input: Input): Promise<Response> => {
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

export {
  useStorageFiles,
  useAddStorageFile,
  getUploadedFilesData,
  useFetchStorageFileUrl,
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

export async function extractTextFromFileBlob(fileBlob: Blob): Promise<string> {
  // var reader = new FileReader()
  // reader.onloadend = function (event) {
  //   var arrayBuffer = reader.result
  //   mammoth
  //     .extractRawText({ arrayBuffer: arrayBuffer as ArrayBuffer })
  //     .then(function (resultObject) {
  //       console.log("🚀 ~ resultObject:", resultObject.value)
  //       // result2.innerHTML = resultObject.value
  //       console.log(resultObject.value)
  //     })
  // }
  // reader.readAsArrayBuffer(fileBlob)
  try {
    const data = await fileBlob.arrayBuffer()
    const textResult = await mammoth.extractRawText({ arrayBuffer: data })
    console.log("🚀 ~ extractTextFromFileBlob ~ textResult:", textResult.value)
    return textResult.value
  } catch (error) {
    console.error("Error extracting text:", (error as Error).message) // Add type assertion to specify the type of 'error'
    console.error("File size:", fileBlob.size)
    throw new Error("Failed to extract text from file")
  }
}
