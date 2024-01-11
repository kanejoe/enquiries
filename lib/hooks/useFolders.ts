import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const keys = {
  getFolders: ["folders"],
}

const fetchFolders = async () => {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from("folders")
    .select("id, folder_name, parent_folder_id")
    .order("created_at", { ascending: false })
    .throwOnError()

  if (!data) {
    return []
  }

  // If no error, return the data
  return organizeFolders(data)
}

const useFolders = () => {
  return useQuery({
    queryKey: keys.getFolders,
    queryFn: () => fetchFolders(),
    retry: false,
  })
}

/*const useAddStorageFile = (options: { onSuccess: () => void }) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (selectedFile: File) => {
      const { error } = await supabase.storage
        .from("files")
        .upload(`${crypto.randomUUID()}/${selectedFile.name}`, selectedFile)

      if (error) {
        throw new Error(error.message) // Throw an error if the addition fails
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getFiles })
      options.onSuccess()
    },
  })
}*/

export { useFolders }

type Folder = {
  id: number
  folder_name: string
  parent_folder_id: number | null
  children?: Folder[]
}

function organizeFolders(data: Folder[]): Folder[] {
  // Create a map for easy access to folders by their id
  const folderMap = new Map<number, Folder>()

  // Initialize the map and assign an empty array to 'children'
  data.forEach((folder) => {
    folder.children = []
    folderMap.set(folder.id, folder)
  })

  // The result array for folders without a parent
  const result: Folder[] = []

  data.forEach((folder) => {
    if (folder.parent_folder_id === null) {
      // If the folder has no parent, it's a top-level folder
      result.push(folder)
    } else {
      // If the folder has a parent, find the parent and add this folder to its children
      const parentFolder = folderMap.get(folder.parent_folder_id)
      if (parentFolder && parentFolder.children) {
        parentFolder.children.push(folder)
      }
    }
  })

  return result
}
