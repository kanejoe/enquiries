import { Document } from "@langchain/core/documents"
import mammoth from "mammoth/mammoth.browser"

import { PDFPage } from "@/lib/types/pdf-page"
import { prepareDocument } from "@/lib/utils/parse-document"

/**
 * Parses a PDF file and returns an array of sections to insert into a document.
 * @param file - The PDF file to parse.
 * @returns An array of sections to insert, each containing the document ID, metadata, and content.
 */
export async function ParseDocx(fileBlob: Blob) {
  try {
    const arrayBuffer = await fileBlob.arrayBuffer()
    // const buffer = Buffer.from(arrayBuffer)
    const content = await mammoth.extractRawText({ arrayBuffer })
    const page: PDFPage = {
      metadata: {
        pageNumber: 1,
        totalPages: 1,
        loc: { pageNumber: 1 },
      },
      pageContent: content.value,
    }
    const documents = await prepareDocument(page)

    // const documents = await Promise.all(pages.map(prepareDocument))
    const sectionsToInsert = documents.flat().map((doc: Document) => {
      return {
        metadata: doc.metadata,
        content: doc.pageContent,
      }
    })
    return sectionsToInsert
  } catch (error) {
    // Handle the error here
    console.error((error as Error).message)
    throw error
  }
}
