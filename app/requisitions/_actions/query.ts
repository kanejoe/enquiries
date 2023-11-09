import { supabase } from "@/lib/supabase"

export async function getRequisitions() {
  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")
  if (error) throw error
  return requisitions
}
