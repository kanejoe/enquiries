import { truncateStringByBytes } from "@/supabase/functions/_shared/docParser"
import { Document } from "@langchain/core/documents"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import { PDFPage } from "../types/pdf-page"

/**
 * Prepares the document by splitting the page content into smaller chunks and creating Document objects.
 * @param page The PDFPage object to be processed.
 * @returns A promise that resolves to an array of Document objects.
 */
export async function prepareDocument(page: PDFPage): Promise<Document[]> {
  const CHUNKSIZE = 12000
  const { metadata, pageContent } = page
  let pg = pageContent.replace(/\n/g, " ").replace(/\x00/g, "")

  // split the docs
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNKSIZE, // TODO: make this a constant and check out the ideal value
    chunkOverlap: 300,
  })

  const docs = await textSplitter.splitDocuments([
    new Document({
      pageContent: pg,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        totalPages: metadata.pdf.totalPages,
        text: truncateStringByBytes(pg, CHUNKSIZE),
      },
    }),
  ])
  return docs
}
