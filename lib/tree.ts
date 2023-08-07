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

/**
 *
 * @param data
 * @returns
 */
function getHeaderNodes(data: AtomicRequisition[]): AtomicRequisition[] {
  // Filter the root nodes (those with parentId equal to an empty string)
  const rootNodes = data.filter((item) => item.parentId === "")

  // Sort the root nodes by the 'character' property in numeric order
  rootNodes.sort((a, b) => a.character - b.character)

  // Return only the relevant properties without children
  return rootNodes.map((node) => ({
    reqId: node.reqId,
    character: node.character,
    query: node.query,
    isApplicable: node.isApplicable,
  }))
}

/**
 *
 * @param tree
 * @returns
 */
function getNonRootApplicableNodes(
  tree: AtomicRequisition[]
): AtomicRequisition[] {
  let result: AtomicRequisition[] = []

  // Recursive function to traverse the tree and filter non-root applicable nodes
  function traverse(node: AtomicRequisition) {
    // Check if the node is not a root node and is applicable
    if (node.parentId !== "" && node.isApplicable) {
      result.push(node)
    }

    // Continue to traverse children if they exist
    if (node.children) {
      node.children.forEach(traverse)
    }
  }

  // Start the traversal from the root nodes of the tree
  tree.forEach(traverse)

  return result
}

/**
 *
 * @param tree
 * @returns
 */
function getNonRootApplicableNodesGroupedByRoot(
  tree: AtomicRequisition[]
): { reqId: string; nodes: AtomicRequisition[] }[] {
  const result: { reqId: string; nodes: AtomicRequisition[] }[] = []

  // Recursive function to traverse the tree and filter applicable non-root nodes
  function traverse(
    node: AtomicRequisition,
    nonRootApplicableNodes: AtomicRequisition[]
  ) {
    // If the node is applicable and not at the root level (has a parentId), add it to the result
    if (node.isApplicable && node.parentId !== "") {
      nonRootApplicableNodes.push(node)
    }

    // Continue to traverse children if they exist
    if (node.children) {
      node.children.forEach((child) => traverse(child, nonRootApplicableNodes))
    }
  }

  // Iterate through the root nodes of the tree
  tree.forEach((rootNode) => {
    if (rootNode.isApplicable) {
      // Check if the root node is applicable
      const nonRootApplicableNodes: AtomicRequisition[] = []
      traverse(rootNode, nonRootApplicableNodes)
      if (nonRootApplicableNodes.length > 0) {
        result.push({ reqId: rootNode.reqId, nodes: nonRootApplicableNodes })
      }
    }
  })

  return result
}

/**
 *
 * @param data
 * @param characterValue
 * @returns
 */
function findRootNodeWithCharacter(
  data: AtomicRequisition[],
  characterValue: number
): AtomicRequisition | undefined {
  const resp = data.find(
    (node) => node.character === characterValue && node.parentId === ""
  )
  return resp
}

/**
 * exports
 */
export {
  createTree,
  findNodeByReqId,
  getHeaderNodes,
  getNonRootApplicableNodes,
  getNonRootApplicableNodesGroupedByRoot,
  findRootNodeWithCharacter,
}
