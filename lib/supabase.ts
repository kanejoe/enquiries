// import { cache } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/database.types"

export const dynamic = "force-dynamic"

const supabase = createServerComponentClient<Database>({ cookies })

// export const createServerSupabaseClient = cache(() => {
//   const cookieStore = cookies()
//   return createServerComponentClient({ cookies: () => cookieStore })
// })

// const supabase = createServerSupabaseClient()

export { supabase }
