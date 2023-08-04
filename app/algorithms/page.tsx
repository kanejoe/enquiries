"use client"

import superjson from "superjson"

import type { AtomicRequisition } from "@/types/AtomicRequisitionType"

import { testdata } from "../atomic_requisition/data"

const jsonString = superjson.stringify(testdata)

/**
 *
 * @returns
 */
export default function AlgorithmPage() {
  const createdTree = createTree(testdata)

  console.log(
    "🚀 ~ file: page.tsx:34 ~ AlgorithmPage ~ createdTree:",
    createdTree
  )
  //   console.log("🚀 ~ file: page.tsx:30 ~ AlgorithmPage ~ tree:", tree)
  return (
    <section className="mt-4 flex flex-col gap-y-6">
      <section className="">
        <h1 className="text-xl font-semibold">Test the Algorithms</h1>
      </section>
      <section className="">{jsonString}</section>
      <hr className="bg-slate-100" />
      <section>
        {testdata.map((req) => {
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
        {createdTree.map((req) => {
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
    </section>
  )
}

function createTree(data: AtomicRequisition[]): AtomicRequisition[] {
  const map = new Map<string, AtomicRequisition>()
  const rootNodes: AtomicRequisition[] = []

  // Organize the nodes in a map and find the root nodes
  data.forEach((item) => {
    map.set(item.reqId, { ...item, children: [], characters: [item.character] })
    if (item.parentId === "") {
      rootNodes.push(map.get(item.reqId)!)
    }
  })

  // Recursive function to sort and add children
  function addChildren(node: AtomicRequisition) {
    data
      .filter((item) => item.parentId === node.reqId)
      .sort((a, b) => {
        const levelDiff = a.level - b.level
        if (levelDiff !== 0) return levelDiff
        return a.character - b.character
      })
      .forEach((child) => {
        const childNode = map.get(child.reqId)!
        childNode.characters = [...node.characters!, child.character]
        node.children!.push(childNode)
        addChildren(childNode)
      })
  }

  // Add children to the root nodes and sort them
  rootNodes.sort((a, b) => {
    const levelDiff = a.level - b.level
    if (levelDiff !== 0) return levelDiff
    return a.character - b.character
  })
  rootNodes.forEach(addChildren)

  return rootNodes
}
