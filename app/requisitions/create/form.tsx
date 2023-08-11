"use client"

import {
  Suspense,
  experimental_useOptimistic as useOptimistic,
  useRef,
} from "react"

import { editRequisitionAction } from "./actions"

export function Thread({ requisition }) {
  const [optimisticQuery, addOptimisticQuery] = useOptimistic(
    requisition.query,
    (currentState, newState) => newState
  )

  const formRef = useRef()

  return (
    <div>
      <form
        action={async (formData) => {
          const query = formData.get("query")
          //   formRef.current.reset()
          addOptimisticQuery(query)
          await editRequisitionAction(requisition.id, query)
        }}
        ref={formRef}
      >
        <legend>{optimisticQuery}</legend>
        <input type="text" name="query" defaultValue={optimisticQuery} />
      </form>
    </div>
  )
}
