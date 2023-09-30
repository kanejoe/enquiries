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
      properties: {
        Row: {
          created_at: string
          eircode: string | null
          id: number
          property: string | null
          vendor: string | null
        }
        Insert: {
          created_at?: string
          eircode?: string | null
          id?: number
          property?: string | null
          vendor?: string | null
        }
        Update: {
          created_at?: string
          eircode?: string | null
          id?: number
          property?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      requisitions: {
        Row: {
          has_doc: boolean
          id: number
          is_applicable: boolean
          is_complete: boolean
          is_flagged: boolean
          is_required: boolean
          parent_id: number | null
          query: string | null
          reply: string | null
          sequence: number
        }
        Insert: {
          has_doc?: boolean
          id?: never
          is_applicable?: boolean
          is_complete?: boolean
          is_flagged?: boolean
          is_required?: boolean
          parent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Update: {
          has_doc?: boolean
          id?: never
          is_applicable?: boolean
          is_complete?: boolean
          is_flagged?: boolean
          is_required?: boolean
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
      adjust_sequence: {
        Args: {
          p_parent_id: number
          p_new_sequence: number
          p_old_sequence: number
        }
        Returns: undefined
      }
      inc_sequence: {
        Args: {
          p_parent_id: number
          p_sequence_threshold: number
        }
        Returns: undefined
      }
      insert_and_resequence: {
        Args: {
          p_query: string
          p_parent_id: number
          p_sequence: number
        }
        Returns: undefined
      }
      update_requisition: {
        Args: {
          p_id: number
          p_parent_id: number
          p_old_sequence: number
          p_new_sequence: number
          p_query: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
