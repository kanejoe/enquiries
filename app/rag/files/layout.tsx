import { PropsWithChildren } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { TreeViewWrapper } from "./_tree-view"

export default async function FilesLayout({ children }: PropsWithChildren) {
  // Keep cookies in the JS execution context for Next.js build
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="container mt-8 font-albertsans">
      <div className="grid h-128 grid-cols-12 gap-x-20">
        <div className="col-span-7">
          <TreeViewWrapper />
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </div>
  )
}
