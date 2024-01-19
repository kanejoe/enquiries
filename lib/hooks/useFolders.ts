import { folder_seed_data } from "@/data/folder_seed_data"
import { Database, Tables } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { organizeFolders } from "./organise-folders"

const keys = {
  getFolders: ["folders"],
}

const fetchFolders = async () => {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from("folders_with_documents")
    .select("*")
    .throwOnError()

  if (!data) {
    return []
  }

  // If no error, return the data
  const tree = organizeFolders(data)
  // console.log("🚀 ~ fetchFolders ~ data:", data)
  console.log("🚀 ~ fetchFolders ~ tree:", tree)
  return tree
}

const useFolders = () => {
  return useQuery({
    queryKey: keys.getFolders,
    queryFn: () => fetchFolders(),
    retry: false,
  })
}

const useSetUpFolderStructure = (options: { onSuccess: () => void }) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("folders")
        .insert(folder_seed_data)
        .throwOnError()
      if (error) {
        throw new Error(error.message) // Throw an error if the addition fails
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getFolders })
      options.onSuccess()
    },
  })
}

interface FormData {
  parent_id: number
  parent_folder_name: string
  new_folder_name: string
}

const useAddSubFolder = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation<Tables<"folders">, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<Tables<"folders">> => {
      const { data } = await supabase
        .from("folders")
        .insert({
          folder_name: formData.new_folder_name,
          parent_folder_id: formData.parent_id,
        })
        .throwOnError()
        .select()
        .single()

      if (!data) {
        throw new Error("Invalid data")
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getFolders })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

interface EditFormData {
  id: number
  folder_name: string
}

const useEditFolderName = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation<Tables<"folders">, Error, EditFormData>({
    mutationFn: async (formData: EditFormData): Promise<Tables<"folders">> => {
      const { data } = await supabase
        .from("folders")
        .update({ folder_name: formData.folder_name })
        .eq("id", formData.id)
        .throwOnError()
        .select()
        .single()

      if (!data) {
        throw new Error("Invalid data")
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getFolders })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

export {
  useFolders,
  useSetUpFolderStructure,
  useAddSubFolder,
  useEditFolderName,
}
