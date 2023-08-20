import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/database.types"

const supabase = createServerComponentClient<Database>({ cookies })

export { supabase }
