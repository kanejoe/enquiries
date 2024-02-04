import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Database, Tables } from "@/lib/database.types"

// types
type TTags = Tables<"tags">
type TTagFormData = { tag_name: TTags["tag_name"] } & {
  id?: TTags["id"]
}
type TDocument = Tables<"documents"> // Simplified; adjust according to your actual type definition

// Define a type for the document joined with its tags
type TDocumentWithTags = TDocument & {
  tags: TTags[] // Assuming each document can have multiple tags
}

const keys = {
  getTags: ["tags"] as const,
  getDocumentsWithTags: ["documentsWithTags"] as const,
}

const fetchTags = async (): Promise<TTags[]> => {
  const supabase = createClientComponentClient<Database>()
  const { data } = await supabase.from("tags").select("*").throwOnError()

  if (!data) return []
  return data
}

const useTags = () => {
  return useQuery({
    queryKey: keys.getTags,
    queryFn: () => fetchTags(),
    retry: false,
  })
}

const fetchDocumentsWithTags = async (): Promise<TDocumentWithTags[]> => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .from("documents")
    .select(
      `
      *,
      document_tags!inner(
        tag_id
      ),
      tags (
        tag_name
      )`
    )
    .throwOnError()

  if (error || !data) {
    console.error(error?.message)
    return []
  }

  // Transform data if necessary to fit the TDocumentWithTags type
  return data.map((doc) => ({
    ...doc,
    tags: doc.document_tags.map((dt) => dt.tags),
  }))
}

const useDocumentsWithTags = () => {
  return useQuery({
    queryKey: keys.getDocumentsWithTags,
    queryFn: () => fetchDocumentsWithTags(),
    retry: false,
  })
}

const useAddTag = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation<TTags, Error, TTagFormData>({
    mutationFn: async (formData: TTagFormData): Promise<TTags> => {
      const { data } = await supabase
        .from("tags")
        .insert({
          tag_name: formData.tag_name,
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
      queryClient.invalidateQueries({ queryKey: keys.getTags })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

export { useTags, useDocumentsWithTags, useAddTag }
