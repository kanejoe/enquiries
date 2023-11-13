import { supabase } from "@/lib/supabase"
import { waitABit } from "@/lib/waitABit"

export async function getRequisitions() {
  // await waitABit(3000)
  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")
  if (error) throw error
  return requisitions
}
