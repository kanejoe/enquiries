import { Suspense } from "react"

import LoadingSkeleton from "@/components/LoadingSkeleton"

export default async function CreateRequisitionPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="">Add a button here</section>
    </Suspense>
  )
}
