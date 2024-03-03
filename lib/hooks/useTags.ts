import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Database, Tables } from "@/lib/types/database.types"

import { keys } from "./keys"
import { TDocuments } from "./useFolders"

// types
export type TTags = Tables<"tags">
export type TTagFormDataNoID = { tag_name: TTags["tag_name"] }
export type TTagFormData = TTagFormDataNoID & {
  id: TTags["id"]
}
export type TDocument = Tables<"documents"> // Simplified; adjust according to your actual type definition

// Define a type for the document joined with its tags
type TDocumentWithTags = TDocument & {
  tags: TTags[] | null // Assuming each document can have multiple tags
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

const fetchDocumentsWithTags = async () => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase.rpc("get_documents_with_tags")

  if (error) {
    console.error("Error fetching documents with tags:", error)
    return null
  }

  return data
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
  return useMutation({
    mutationFn: async (formData: TTagFormDataNoID): Promise<TTags> => {
      // Step 1: Check if the tag exists in a case-insensitive manner
      const { data: existingTags, error: searchError } = await supabase
        .from("tags")
        .select()
        .ilike("tag_name", formData.tag_name.toLowerCase())

      if (searchError) {
        console.error("Error checking for existing tag:", searchError)
        throw new Error("Error checking for existing tag")
      }

      // If the tag does not exist, insert it
      if (existingTags.length === 0) {
        const { data, error: insertError } = await supabase
          .from("tags")
          .insert([
            {
              tag_name: formData.tag_name,
            },
          ])
          .select("*")
          .single()

        if (insertError) {
          console.error("Error inserting new tag:", insertError)
          throw new Error("Error inserting new tag")
        } else {
          // console.log("Tag inserted successfully:", data)
          return data as TTags
        }
      } else {
        // Tag exists, handle according to your requirements
        console.log("Tag already exists, skipping insert.")
        return existingTags[0] as TTags
      }
    },
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: keys.getTags })
      options.onSuccess()
      return data
    },
    onError: (error: Error) => options.onError(error),
  })
}

const useDeleteTag = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: TTags["id"]): Promise<void> => {
      await supabase.from("tags").delete().eq("id", id).throwOnError()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.getTags })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

const addDocumentTag = async (
  documentId: TDocument["id"],
  tagId: TTags["id"]
) => {
  const supabase = createClientComponentClient<Database>()
  await supabase
    .from("document_tags")
    .insert({
      document_id: documentId,
      tag_id: tagId,
    })
    .throwOnError()
}

const useAddDocumentTag = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
  documentId: TDocument["id"]
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: {
      documentId: TDocument["id"]
      tagId: TTags["id"]
    }) => {
      await addDocumentTag(data.documentId, data.tagId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [keys.getDocumentsWithTags, options.documentId],
      })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

const fetchDocumentWithTagsById = async (documentId: TDocuments["id"]) => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .rpc("get_single_document_with_tags", {
      p_document_id: documentId,
    })
    .single()
    .throwOnError()

  if (error) {
    console.error("Error fetching documents with tags:", error)
    return null
  }

  return data as TDocumentWithTags
}

const useFetchDocumentWithTagsById = (documentId: TDocuments["id"]) => {
  return useQuery({
    queryKey: [keys.getDocumentsWithTags, documentId],
    queryFn: () => fetchDocumentWithTagsById(documentId),
    retry: false,
  })
}

const useDeleteTagFromDocument = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
  documentId: TDocument["id"]
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: {
      documentId: TDocument["id"]
      tagId: TTags["id"]
    }) => {
      await supabase
        .from("document_tags")
        .delete()
        .eq("document_id", data.documentId)
        .eq("tag_id", data.tagId)
        .throwOnError()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [keys.getDocumentsWithTags, options.documentId],
      })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

const useFetchDocumentsByTagName = (tagName: TTags["tag_name"]) => {
  return useQuery({
    queryKey: ["documentsByTagName", tagName],
    queryFn: async () => {
      const supabase = createClientComponentClient<Database>()
      const { data, error } = await supabase
        .rpc("get_documents_by_tag_name", {
          p_tag_name: tagName,
        })
        .throwOnError()

      if (error) {
        console.error("Error fetching documents by tag name:", error)
        return null
      }

      return data
    },
    retry: false,
  })
}

export {
  useTags,
  useDocumentsWithTags,
  useAddTag,
  useDeleteTag,
  useAddDocumentTag,
  useFetchDocumentWithTagsById,
  useDeleteTagFromDocument,
  useFetchDocumentsByTagName,
}
