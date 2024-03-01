export type PDFPage = {
  document_id: number
  pageContent: string
  metadata: {
    [x: string]: any
    loc: { pageNumber: number }
  }
}
