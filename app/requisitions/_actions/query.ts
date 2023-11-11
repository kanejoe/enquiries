import { delay } from "lodash"

import { supabase } from "@/lib/supabase"
import { waitABit } from "@/lib/wait.a.bit"

export async function getRequisitions() {
  // await waitABit(3000)
  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")
  if (error) throw error
  return requisitions
}
