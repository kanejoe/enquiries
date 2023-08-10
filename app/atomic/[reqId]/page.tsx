import { FC } from "react"
import type { AtomicRequisition } from "@/types"

import { StoreInitializer } from "@/components/StoreInitializer"
import { useAtomicReqStore } from "@/app/atomic_requisition/reqStore"

import { AtomicReqContainer } from "./AtomicReqContainer"

interface pageProps {
  params: { reqId: string }
}

const page: FC<pageProps> = async ({ params: { reqId } }) => {
  const req = await fetch(`http://localhost:3000/api/atomic/${reqId}`, {
    cache: "no-store",
  })
  const data = await req.json()
  useAtomicReqStore.setState({ requisitions: data })

  return (
    <main className="flex flex-col gap-y-2">
      <StoreInitializer requisitions={data} />
      <section>
        <AtomicReqContainer requisition={data} />
      </section>
    </main>
  )
}

export default page
