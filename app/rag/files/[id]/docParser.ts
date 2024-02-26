import { Document } from "@langchain/core/documents"
// import { DocxLoader } from "langchain/document_loaders/fs/docx"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

type PDFPage = {
  documnent_id: number
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
    // source: string
  }
}

/**
 * Parses a PDF file and returns an array of sections to insert into a document.
 * @param file - The PDF file to parse.
 * @param document_id - The ID of the document.
 * @returns An array of sections to insert, each containing the document ID, metadata, and content.
 */
export async function ParsePdf(file: Blob, document_id: number) {
  try {
    const loader = new PDFLoader(file)
    const pages = (await loader.load()) as PDFPage[]

    const documents = await Promise.all(pages.map(prepareDoc))
    const sectionsToInsert = documents.flat().map((doc: Document) => {
      return {
        document_id,
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

export async function prepareDoc(page: PDFPage): Promise<Document[]> {
  const { metadata, pageContent } = page
  let pg = pageContent.replace(/\n/g, " ").replace(/\x00/g, "")
  // split the docs
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 12000,
    chunkOverlap: 300,
  })

  const docs = await textSplitter.splitDocuments([
    new Document({
      pageContent: pg,
      metadata: {
        pageNumber: metadata.loc,
        // text: truncateStringByBytes(pg, 12000),
      },
    }),
  ])
  return docs
}
