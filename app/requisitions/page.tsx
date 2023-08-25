import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function ServerComponent() {
  return (
    <main className="flex flex-col gap-y-2">
      <section>a basic page</section>
    </main>
  )
}
