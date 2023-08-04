import type { AtomicRequisition } from "@/types/AtomicRequisitionType"

/**
 *
 * @param data
 * @returns
 */
function createTree(data: AtomicRequisition[]): AtomicRequisition[] {
  const map = new Map<string, AtomicRequisition>()
  const rootNodes: AtomicRequisition[] = []

  // Organize the nodes in a map and find the root nodes
  data.forEach((item) => {
    map.set(item.reqId, { ...item, children: [] })
    if (item.parentId === "") {
      const rootNode = map.get(item.reqId)!
      rootNode.level = 1 // Setting the level for root nodes
      rootNode.characters = [rootNode.character] // Setting the characters for root nodes
      rootNodes.push(rootNode)
    }
  })

  // Recursive function to sort and add children
  function addChildren(
    node: AtomicRequisition,
    level: number,
    characters: number[]
  ) {
    data
      .filter((item) => item.parentId === node.reqId)
      .sort((a, b) => a.character - b.character)
      .forEach((child) => {
        const childNode = map.get(child.reqId)!
        childNode.level = level // Setting the level
        childNode.characters = [...characters, childNode.character] // Adding the characters array
        node.children!.push(childNode)
        addChildren(childNode, level + 1, childNode.characters) // Incrementing the level for children
      })
  }

  // Add children to the root nodes and sort them
  rootNodes.sort((a, b) => a.character - b.character)
  rootNodes.forEach((node) => addChildren(node, 2, node.characters!)) // Starting children with level 2

  return rootNodes
}

/**
 * This gets a single node from the tree
 * @param tree
 * @param reqId
 * @returns
 */
function findNodeByReqId(
  tree: AtomicRequisition[],
  reqId: AtomicRequisition["reqId"]
): AtomicRequisition | null {
  for (const node of tree) {
    if (node.reqId === reqId) {
      return node
    }
    if (node.children) {
      const found = findNodeByReqId(node.children, reqId)
      if (found) {
        return found
      }
    }
  }
  return null // Return null if not found
}

export { createTree, findNodeByReqId }
