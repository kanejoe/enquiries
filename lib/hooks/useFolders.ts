import { useCallback } from "react"
import { folder_seed_data } from "@/data/folder_seed_data"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Database, Tables } from "@/lib/types/database.types"
import {
  TFolders,
  type TDocuments,
  type TDocumentSections,
  type TDocumentWithSections,
  type TExtendedDocuments,
} from "@/lib/types/TableTypes"

import { countWords } from "../countWords"
import { organizeFolders } from "../organise-folders"
import { keys } from "./keys"

// types
interface EditFormData {
  id: number
  folder_name: string
}

interface EditDocumentNameFormData {
  id: number
  name: string
}

interface FormData {
  parent_id: number
  parent_folder_name: string
  new_folder_name: string
}

const fetchFoldersWithDocuments = async () => {
  const supabase = createClientComponentClient<Database>()

  const { data } = await supabase
    .from("folders_with_documents")
    .select("*")
    .throwOnError()

  if (!data) return []

  // If no error, return the data
  const tree = organizeFolders(data)
  return tree
}

type TFolderPicked = Pick<TFolders, "id" | "folder_name" | "parent_folder_id">

const fetchFolders = async (): Promise<TFolderPicked[]> => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .from("folders")
    .select("id, folder_name, parent_folder_id")
    .throwOnError()

  if (!data) return []
  return data
}

const useFoldersWithDocuments = () => {
  return useQuery({
    queryKey: keys.getDocuments,
    queryFn: () => fetchFoldersWithDocuments(),
    retry: false,
  })
}

const useFolders = () => {
  return useQuery({
    queryKey: keys.getFolders,
    queryFn: () => fetchFolders(),
    retry: false,
  })
}

const fetchDocumentById = async (
  documentId: string
): Promise<TDocumentWithSections> => {
  const supabase = createClientComponentClient<Database>()
  const { data } = await supabase
    .from("documents")
    .select(
      ` *,
        document_sections (
          content, isvectorized
        )
      `
    )
    .eq("id", documentId)
    .single()
    .throwOnError()

  if (!data) throw new Error("Document not found") // Throw an error if the document is not found
  return data
}

// https://tkdodo.eu/blog/react-query-and-type-script#the-four-generics
// React Query hook to get a single document
const useDocument = (documentId: string) => {
  return useQuery<TDocuments, Error, TExtendedDocuments>({
    queryKey: [keys.getDocuments, documentId], // Dynamic query key based on the document ID
    queryFn: () => fetchDocumentById(documentId),
    retry: false,
    select: useCallback((data: any) => {
      return Object.assign({}, data, {
        content: data.document_sections
          .map((section: any) => section.content)
          .join(" "),
        wordCount: countWords(
          data.document_sections
            .map((section: any) => section.content)
            .join(" ")
        ),
      })
    }, []),
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

const useAddSubFolder = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation<Tables<"folders">, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<TFolders> => {
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
      queryClient.invalidateQueries({ queryKey: keys.getDocuments })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

const useAddFolder = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation<
    Tables<"folders">,
    Error,
    Pick<FormData, "new_folder_name">
  >({
    mutationFn: async (
      formData: Pick<FormData, "new_folder_name">
    ): Promise<Tables<"folders">> => {
      const { data } = await supabase
        .from("folders")
        .insert({
          folder_name: formData.new_folder_name,
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
      queryClient.invalidateQueries({ queryKey: keys.getDocuments })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

const useEditFolderName = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation<Tables<"folders">, Error, EditFormData>({
    mutationFn: async (formData: EditFormData): Promise<TFolders> => {
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

const useUpdateDocumentName = (options: {
  onSuccess: () => void
  onError: (error: Error) => void
}) => {
  const supabase = createClientComponentClient<Database>()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (
      formData: EditDocumentNameFormData
    ): Promise<TDocuments> => {
      const { data } = await supabase
        .from("documents")
        .update({ name: formData.name })
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
      queryClient.invalidateQueries({
        queryKey: [keys.getDocumentsWithTags],
      })
      queryClient.invalidateQueries({
        queryKey: [keys.getDocuments],
      })
      options.onSuccess()
    },
    onError: (error: Error) => options.onError(error),
  })
}

export {
  useDocument,
  useFolders,
  useFoldersWithDocuments,
  useSetUpFolderStructure,
  useAddFolder,
  useAddSubFolder,
  useEditFolderName,
  useUpdateDocumentName,
}
