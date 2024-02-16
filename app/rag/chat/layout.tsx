import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"

import { createServerSupabaseClient } from "@/lib/supabase.server"

export default async function ChatLayout({ children }: PropsWithChildren) {
  // Keep cookies in the JS execution context for Next.js build
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return <div className="h-[90vh] font-geistsans">{children}</div>
}
