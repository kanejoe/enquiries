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
      document_sections: {
        Row: {
          content: string
          document_id: number
          embedding: string | null
          id: number
        }
        Insert: {
          content: string
          document_id: number
          embedding?: string | null
          id?: never
        }
        Update: {
          content?: string
          document_id?: number
          embedding?: string | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "document_sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents_with_storage_path"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          created_at: string
          created_by: string
          id: number
          name: string
          storage_object_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: never
          name: string
          storage_object_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: never
          name?: string
          storage_object_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_storage_object_id_fkey"
            columns: ["storage_object_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
      precedents: {
        Row: {
          asset_id: number | null
          created_at: string | null
          created_by: string | null
          id: number
          is_archived: boolean | null
          is_locked: boolean
          name: string
          subname: string
        }
        Insert: {
          asset_id?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          is_archived?: boolean | null
          is_locked?: boolean
          name: string
          subname: string
        }
        Update: {
          asset_id?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          is_archived?: boolean | null
          is_locked?: boolean
          name?: string
          subname?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          category: string | null
          created_at: string
          eircode: string | null
          id: number
          is_archived: boolean | null
          property: string | null
          status: string | null
          vendor: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          eircode?: string | null
          id?: number
          is_archived?: boolean | null
          property?: string | null
          status?: string | null
          vendor?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          eircode?: string | null
          id?: number
          is_archived?: boolean | null
          property?: string | null
          status?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      requisitions: {
        Row: {
          has_doc: boolean
          id: number
          is_applicable: boolean
          is_archived: boolean | null
          is_complete: boolean
          is_flagged: boolean
          is_locked: boolean
          is_required: boolean
          parent_id: number | null
          precedent_id: number | null
          query: string | null
          reply: string | null
          sequence: number
        }
        Insert: {
          has_doc?: boolean
          id?: never
          is_applicable?: boolean
          is_archived?: boolean | null
          is_complete?: boolean
          is_flagged?: boolean
          is_locked?: boolean
          is_required?: boolean
          parent_id?: number | null
          precedent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Update: {
          has_doc?: boolean
          id?: never
          is_applicable?: boolean
          is_archived?: boolean | null
          is_complete?: boolean
          is_flagged?: boolean
          is_locked?: boolean
          is_required?: boolean
          parent_id?: number | null
          precedent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "requisitions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "requisitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requisitions_precedent_id_fkey"
            columns: ["precedent_id"]
            isOneToOne: false
            referencedRelation: "precedents"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      documents_with_storage_path: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number | null
          name: string | null
          storage_object_id: string | null
          storage_object_path: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_storage_object_id_fkey"
            columns: ["storage_object_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
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
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
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
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      update_requisition:
        | {
            Args: {
              p_id: number
              p_parent_id: number
              p_old_sequence: number
              p_new_sequence: number
              p_query: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_id: number
              p_parent_id: number
              p_old_sequence: number
              p_new_sequence: number
              p_query: string
              p_is_required: boolean
            }
            Returns: undefined
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
