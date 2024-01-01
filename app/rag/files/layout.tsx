import { PropsWithChildren } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function FilesLayout({ children }: PropsWithChildren) {
  // Keep cookies in the JS execution context for Next.js build
  const cookieStore = cookies()

  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log("🚀 ~ file: layout.tsx:14 ~ FilesLayout ~ user:", user)

  if (!user) {
    return redirect("/login")
  }

  return <>{children}</>
}
