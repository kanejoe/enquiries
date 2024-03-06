export type PDFPage = {
  pageContent: string
  metadata: {
    [x: string]: any
    loc: { pageNumber: number }
  }
}
