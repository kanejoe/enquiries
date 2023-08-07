import { NextResponse } from "next/server"

import { createTree } from "@/lib/tree"
import { testdata1 as requisitions } from "@/app/atomic_requisition/data"

export async function GET(request: Request) {
  const tree = createTree(requisitions)
  return NextResponse.json(tree)
}
