"use client"

import { useRef } from "react"
import type { AtomicRequisition } from "@/types"

import { useAtomicReqStore } from "../app/atomic_requisition/reqStore"

function StoreInitializer({ requisitions }: any) {
  const initialized = useRef(false)
  if (!initialized.current) {
    useAtomicReqStore.setState({ requisitions })
    initialized.current = true
  }
  return null
}

export { StoreInitializer }
