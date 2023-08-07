import { FC } from "react"
import type { AtomicRequisition } from "@/types"

import { useAtomicReqStore } from "@/app/atomic_requisition/reqStore"

interface pageProps {
  params: { reqId: string }
}

const page: FC<pageProps> = async ({ params: { reqId } }) => {
  const req = await fetch("http://localhost:3000/api/atomic/2")
  const data = await req.json()
  // console.log("🚀 ~ file: page.tsx:10 ~ constpage:FC<pageProps>= ~ data:", data)

  useAtomicReqStore.setState({ requisitions: data })
  return (
    <main className="flex flex-col gap-y-6">
      <section>id page {reqId}</section>
      <section>{JSON.stringify(data)}</section>
      <section>{useAtomicReqStore.getState().requisitions.length}</section>
    </main>
  )
}

export default page
