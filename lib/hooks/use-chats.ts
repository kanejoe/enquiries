import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useQuery } from "@tanstack/react-query"

import { Database, Tables } from "@/lib/database.types"

import { keys } from "./keys"

// types
export type TChatQueries = Tables<"chat_queries">

const fetchChats = async (): Promise<TChatQueries[]> => {
  const supabase = createClientComponentClient<Database>()
  const { data } = await supabase
    .from("chat_queries")
    .select("*")
    .order("created_by", { ascending: false }) // Sort by created_by in descending order
    .throwOnError()

  if (!data) return []

  return data.sort((a, b) => (a.created_by > b.created_by ? -1 : 1))
}

export const useChats = () => {
  return useQuery({
    queryKey: keys.getChats,
    queryFn: () => fetchChats(),
  })
}
