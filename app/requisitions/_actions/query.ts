import { GetPrecedentResponse, Precedent } from "@/types/RequisitionType"
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

/**
 * Retrieves all precedents from the server.
 * @returns A promise that resolves to an array of Precedent objects.
 * @throws If there is an error retrieving the precedents.
 */
export async function getAllPrecedents(): Promise<Precedent[]> {
  // await waitABit(3000)
  const supabase = createServerClient()

  const { data: allPrecedents, error: errorAllPrecedents } = await supabase
    .from("precedents")
    .select("*")

  if (errorAllPrecedents) throw errorAllPrecedents

  return allPrecedents
}
