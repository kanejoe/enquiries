import { cache } from "react"
import { cookies } from "next/headers"
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"

import { Database } from "@/lib/types/database.types"

export const createServerClient = cache(() => {
  const cookieStore = cookies()
  return createClientComponentClient<Database>({
    cookies: () => cookieStore,
  })
})

/**
 * this is erroring out since I put in the [pid] route
 * https://github.com/vercel/next.js/issues/45371
 */
