import { GetPrecedentResponse } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"
import { waitABit } from "@/lib/waitABit"

export async function getPrecedentById(): Promise<GetPrecedentResponse> {
  // await waitABit(3000)

  const { data: precedent, error: errorItems } = await supabase
    .from("precedents")
    .select("*, requisitions( * )")
    .eq("id", 1)
    .single()

  if (errorItems) throw errorItems

  return precedent
}
