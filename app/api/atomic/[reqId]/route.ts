import { NextResponse } from "next/server"

import { createTree, findRootNodeWithCharacter } from "@/lib/tree"
import { testdata1 as requisitions } from "@/app/atomic_requisition/data"

export async function GET(request: Request, context: any) {
  const { reqId } = context.params
  const tree = createTree(requisitions)
  const subtree = findRootNodeWithCharacter(tree, parseInt(reqId))
  console.log("🚀 ~ file: route.ts:10 ~ GET ~ subtree:", subtree)
  // Ensure the rootNode is not undefined before sending the response
  if (subtree === undefined) {
    return NextResponse.json({ error: "Node not found", status: 404 })
  } else {
    return NextResponse.json(subtree)
  }
}
