import { Document } from "@langchain/core/documents"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"

import { PDFPage } from "@/lib/types/pdf-page"
import { prepareDocument } from "@/lib/utils/parse-document"

/**
 * Parses a PDF file and returns an array of sections to insert into a document.
 * @param file - The PDF file to parse.
 * @returns An array of sections to insert, each containing the document ID, metadata, and content.
 */
export async function ParsePdf(fileBlob: Blob) {
  try {
    // throw new Error("Not implemented")
    const loader = new PDFLoader(fileBlob)
    const pages = (await loader.load()) as PDFPage[]

    const documents = await Promise.all(pages.map(prepareDocument))
    const sectionsToInsert = documents.flat().map((doc: Document) => {
      return {
        metadata: doc.metadata,
        content: doc.pageContent,
      }
    })
    return sectionsToInsert
  } catch (error) {
    // Handle the error here
    console.error(error)
    throw error
  }
}
