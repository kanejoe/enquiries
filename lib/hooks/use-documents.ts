import { useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useQuery } from "@tanstack/react-query"

import { Database } from "@/lib/database.types"
import {
  type TDocuments,
  type TDocumentWithSections,
  type TExtendedDocuments,
} from "@/lib/types/TableTypes"

import { countWords } from "../utils/count-words"
import { keys } from "./keys"

// Method to fetch all documents
const fetchAllDocuments = async (): Promise<TDocuments[]> => {
  const supabase = createClientComponentClient<Database>()
  const { data } = await supabase.from("documents").select("*").throwOnError()

  if (!data) throw new Error("No documents found") // Throw an error if no documents are found
  return data
}

const fetchDocumentById = async (
  documentId: TDocuments["id"]
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
const useDocument = (documentId: TDocuments["id"]) => {
  return useQuery<TDocuments, Error, TExtendedDocuments>({
    queryKey: [keys.getDocuments, documentId], // Dynamic query key based on the document ID
    queryFn: () => fetchDocumentById(documentId),
    retry: false,
    refetchOnWindowFocus: false,
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

// React Query hook to get all documents
const useDocuments = () => {
  return useQuery<TDocuments[], Error>({
    queryKey: keys.getDocuments,
    queryFn: fetchAllDocuments,
    retry: false,
  })
}

export { useDocument, useDocuments }
