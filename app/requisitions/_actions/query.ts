import { GetPrecedentResponse } from "@/types/RequisitionType"
import { createServerClient } from "@/lib/supabase"
import { waitABit } from "@/lib/waitABit"

export async function getPrecedentById(
  precedentId: number
): Promise<GetPrecedentResponse> {
  // await waitABit(3000)
  const supabase = createServerClient()

  const { data: precedent, error: errorItems } = await supabase
    .from("precedents")
    .select("*, requisitions( * )")
    .eq("id", precedentId)
    .single()

  if (errorItems) throw errorItems

  return precedent
}
