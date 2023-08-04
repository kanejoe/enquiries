"use client"

// import { performance } from "perf_hooks"
import superjson from "superjson"

import {
  createTree,
  findNodeByReqId,
  getHeaderNodes,
  getNonRootApplicableNodes,
  getNonRootApplicableNodesGroupedByRoot,
} from "@/lib/tree"

import { testdata1 } from "../atomic_requisition/data"

const jsonString = superjson.stringify(testdata1)

/**
 *
 * @returns
 */
export default function AlgorithmPage() {
  //   const start = performance.now()
  const tree = createTree(testdata1)
  //   const end = performance.now()
  //   console.log(`Execution time: ${end - start} milliseconds`)

  console.log("🚀 ~ file: page.tsx:34 ~ AlgorithmPage ~ createdTree:", tree)
  //   console.log("🚀 ~ file: page.tsx:30 ~ AlgorithmPage ~ tree:", tree)

  const foundNode = findNodeByReqId(tree, "XX112")
  console.log("🚀 ~ file: page.tsx:26 ~ AlgorithmPage ~ foundNode:", foundNode)

  const headers = getHeaderNodes(tree)
  console.log("🚀 ~ file: page.tsx:29 ~ AlgorithmPage ~ headers:", headers)

  const nonRootApplicableNodes = getNonRootApplicableNodes(tree)
  console.log(
    "🚀 ~ file: page.tsx:54 ~ AlgorithmPage ~ nonRootApplicableNodes:",
    nonRootApplicableNodes
  )

  const getNonRootApplicableNodesGroupedByRootVals =
    getNonRootApplicableNodesGroupedByRoot(tree)
  console.log(
    "🚀 ~ file: page.tsx:55 ~ AlgorithmPage ~ getNonRootApplicableNodesGroupedByRootVals:",
    getNonRootApplicableNodesGroupedByRootVals
  )

  return (
    <section className="mt-4 flex flex-col gap-y-6">
      <section className="">
        <h1 className="text-xl font-semibold">Test the Algorithms</h1>
      </section>
      {/* <section className="">{jsonString}</section> */}
      <hr className="bg-slate-100" />
      <section>
        {testdata1.map((req) => {
          return (
            <div key={req.reqId} className="mb-2">
              <div className="flex flex-row gap-x-2">
                <div className="w-20">{req.reqId}</div>
                <div className="w-20">{req.parentId}</div>
                <div className="w-20">{req.level}</div>
                <div className="w-20">{req.character}</div>
                <div className="w-196">{req.query}</div>
              </div>
            </div>
          )
        })}
      </section>
      <hr className="bg-slate-100" />

      <section>
        {tree.map((req) => {
          return (
            <div key={req.reqId} className="mb-2">
              <div className="flex flex-row gap-x-2">
                <div className="w-20">{req.reqId}</div>
                <div className="w-20">{req.level}</div>
                <div className="w-20">{req.characters?.join(", ")}</div>
                <div className="w-196">{req.query}</div>
              </div>
            </div>
          )
        })}
      </section>
      <hr className="bg-slate-100" />
    </section>
  )
}
