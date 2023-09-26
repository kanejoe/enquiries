import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

export async function loadAndSplit(pdfDoc: any) {
  try {
    const loader = new PDFLoader(pdfDoc, {
      //   pdfjs: () => import("pdfjs-dist/legacy/build/pdf.js"),
    })
    const doc = await loader.load()
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })
    const docs = await textSplitter.splitDocuments(doc)
    return docs
  } catch (error) {
    throw error
  }
}

export async function vectorizeDocs(docs: any) {
  try {
    const embeddings = new OpenAIEmbeddings()
    // const vectorStore = await HNSWLib.fromDocuments(docs, embeddings) // not working with nextjs 13 appDir:true
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings)
    return vectorStore
  } catch (error) {
    throw error
  }
}
