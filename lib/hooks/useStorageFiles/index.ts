import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useQuery } from "@tanstack/react-query"

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
    queryKey: ["files"],
    queryFn: () => fetchStorageFiles(),
    retry: false,
  })
}

export { useStorageFiles, fetchStorageFiles }
