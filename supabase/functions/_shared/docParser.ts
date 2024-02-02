import { Document } from "langchain/document"
// import { DocxLoader } from "npm:langchain/document_loaders/fs/docx"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import _pdfjs from "pdf-parse"

type PDFPage = {
  documnent_id: number
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
  }
}

/**
 * Parses a PDF file and returns an array of sections to insert into a document.
 * @param file - The PDF file to parse.
 * @param document_id - The ID of the document.
 * @returns An array of sections to insert, each containing the document ID, metadata, and content.
 */
export async function ParsePdf(file: Blob, document_id: number) {
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
}

export async function prepareDoc(page: PDFPage): Promise<Document[]> {
  const { metadata, pageContent } = page
  const pg = pageContent.replace(/\n/g, " ") // or else remove completely
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

export function truncateStringByBytes(str: string, bytes: number) {
  const enc = new TextEncoder()
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes))
}

// export async function parseDocx(fileBlob: Blob, document_id: number) {
//   // console.log("🚀 ~ parseDocx ~ fileBlob:", fileBlob)
//   try {
//     const loader = new DocxLoader(fileBlob)
//     const pages = (await loader.load()) as PDFPage[]
//   } catch (error: unknown) {
//     // console.log("🚀 ~ parseDocx ~ error:", error)
//   }
// }
