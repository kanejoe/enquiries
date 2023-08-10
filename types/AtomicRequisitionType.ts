export interface AtomicRequisition {
  character: number
  characters?: number[]
  children?: AtomicRequisition[]
  hasDoc: boolean
  isApplicable: boolean
  isComplete: boolean
  isFlagged: boolean
  level?: number
  parentId?: string
  query?: string
  reply?: string
  reqId: string
  sources?: string[]
}
