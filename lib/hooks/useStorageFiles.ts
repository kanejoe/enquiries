// import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Database } from "@/lib/database.types"

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

type Response = void

const useAddStorageFile = (options: { onSuccess: () => void }) => {
  const supabase = createClientComponentClient<Database>()

  const queryClient = useQueryClient()
  return useMutation<Response, Error, Input>({
    mutationFn: async (input: Input): Promise<Response> => {
      const { selectedFile, folder_id } = input

      const { data, error } = await supabase.storage
        .from("files")
        .upload(`${crypto.randomUUID()}/${selectedFile.name}`, selectedFile, {
          upsert: true,
        })

      if (error) {
        console.log("🚀 ~ mutationFn: ~ error:", error)
        throw new Error(error.message) // Throw an error if the addition fails
      }

      const { data: document, error: documentError } = await supabase
        .from("documents")
        .update({ folder_id: parseInt(folder_id, 10) })
        .eq("storage_object_id", (data as any).id)
        .select()

      if (document && document.length === 0) console.log("no documents found")
      else console.log("🚀 ~ mutationFn: ~ document:", document)

      if (documentError)
        console.log("🚀 ~ mutationFn: ~ documentError:", documentError)

      // Return a Response object
      // return { data: "data", error: "error" } // Replace "data" and "error" with the actual data and error
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: keys.getDocuments })
      options.onSuccess()
    },
  })
}

export { useStorageFiles, useAddStorageFile, getUploadedFilesData }
