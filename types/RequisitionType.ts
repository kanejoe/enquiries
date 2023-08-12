export interface Requisition {
  children?: Requisition[]
  has_doc?: boolean
  id: number
  is_applicable?: boolean
  is_complete?: boolean
  is_flagged?: boolean
  level?: number
  parent_id?: number
  query?: string
  reply?: string
  sequence: number
  sequence_array?: number[]
  sources?: string[]
}
