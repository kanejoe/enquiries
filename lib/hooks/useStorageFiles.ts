import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const keys = {
  getFiles: ["files"],
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

const useAddStorageFile = (options: { onSuccess: () => void }) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (selectedFile: File) => {
      const { error } = await supabase.storage
        .from("files")
        .upload(`${crypto.randomUUID()}/${selectedFile.name}`, selectedFile)

      if (error) {
        console.log("🚀 ~ mutationFn: ~ error:", error)
        throw new Error(error.message) // Throw an error if the addition fails
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getFiles })
      options.onSuccess()
    },
  })
}

export { useStorageFiles, useAddStorageFile }
