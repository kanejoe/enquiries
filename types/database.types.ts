export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      requisitions: {
        Row: {
          has_doc: boolean
          id: number
          is_applicable: boolean
          is_complete: boolean
          is_flagged: boolean
          parent_id: number | null
          query: string
          reply: string | null
          sequence: number
        }
        Insert: {
          has_doc?: boolean | null
          id?: never
          is_applicable?: boolean | null
          is_complete?: boolean | null
          is_flagged?: boolean | null
          parent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Update: {
          has_doc?: boolean | null
          id?: never
          is_applicable?: boolean | null
          is_complete?: boolean | null
          is_flagged?: boolean | null
          parent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "requisitions_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "requisitions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
