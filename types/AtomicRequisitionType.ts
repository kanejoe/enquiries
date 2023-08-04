export interface AtomicRequisition {
  reqId: string
  character: number
  characters?: number[]
  children?: AtomicRequisition[]
  level?: number
  parentId: string
  query?: string
  reply?: string
  isApplicable: boolean
  sources?: string[]
}
