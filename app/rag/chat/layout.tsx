import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"

import { createServerSupabaseClient } from "@/lib/supabase-funcs/supabase.server"
import { SidebarDesktop } from "@/components/chat/sidebar-desktop"

export default async function ChatLayout({ children }: PropsWithChildren) {
  // Keep cookies in the JS execution context for Next.js build
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="h-[90vh] overflow-hidden font-geistsans">
      <SidebarDesktop />
      <div className="group max-h-[48em] w-full overflow-auto pl-0 duration-300 ease-in-out scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 animate-in peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        {children}
      </div>
    </div>
  )
}
