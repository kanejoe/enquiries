import type {
  EnhancedRequisition,
  HeadingRequisition,
  Requisition,
} from "@/types/RequisitionType"

function createRequisitionTree(
  data: Requisition[] = []
): EnhancedRequisition[] {
  const map = new Map<number, EnhancedRequisition>()
  const rootNodes: EnhancedRequisition[] = []

  function getSiblingSequences(parentId: number | null | undefined): number[] {
    return data
      .filter((item) => item.parent_id === parentId)
      .map((item) => item.sequence)
  }

  data.forEach((item) => {
    const enhancedItem: EnhancedRequisition = {
      ...item,
      children: [],
      siblings: getSiblingSequences(item.parent_id),
      sequence_in_levels: [],
      level: 1,
    }
    map.set(item.id, enhancedItem)
    if (item.parent_id === null) {
      enhancedItem.level = 1
      enhancedItem.sequence_in_levels = [enhancedItem.sequence]
      rootNodes.push(enhancedItem)
    }
  })

  function addChildren(
    node: EnhancedRequisition,
    level: number,
    sequences: number[]
  ) {
    data
      .filter((item) => item.parent_id === node.id)
      .sort((a, b) => a.sequence - b.sequence)
      .forEach((child) => {
        const childNode = map.get(child.id)!
        childNode.level = level
        childNode.sequence_in_levels = [...sequences, childNode.sequence]
        node.children.push(childNode)
        addChildren(childNode, level + 1, childNode.sequence_in_levels)
      })
  }

  rootNodes.sort((a, b) => a.sequence - b.sequence)
  rootNodes.forEach((node) => addChildren(node, 2, node.sequence_in_levels))

  return rootNodes
}

/**
 * This gets a single node from the tree
 * @param tree
 * @param id
 * @returns
 */
function findNodeByReqId(
  tree: EnhancedRequisition[],
  id: Requisition["id"]
): EnhancedRequisition | null {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }
    if (node.children) {
      const found = findNodeByReqId(node.children, id)
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
function getHeaderNodes(data?: EnhancedRequisition[]): HeadingRequisition[] {
  // Check if data is a valid array and has length
  if (!Array.isArray(data) || !data.length) return []

  // Filter the root nodes (those with parent_id equal to null)
  const rootNodes = data.filter((item) => item.parent_id === null)

  // Ensure rootNodes is a valid array
  if (!Array.isArray(rootNodes) || !rootNodes.length) return []

  // Sort the root nodes by the 'sequence' property in numeric order
  rootNodes.sort((a, b) => a.sequence - b.sequence)

  // Return only the relevant properties without children
  return rootNodes.map((node) => ({
    id: node.id,
    sequence: node.sequence,
    level_sequence: transformSequenceArray(node.sequence_in_levels),
    query: node.query === null ? undefined : node.query,
    is_applicable: node.is_applicable,
  }))
}
/**
 *
 * @param tree
 * @returns
 */
function getNonRootApplicableNodes(tree: Requisition[]): Requisition[] {
  let result: Requisition[] = []

  function traverse(node: Requisition) {
    if (node.parent_id !== null && node.is_applicable) {
      result.push(node)
    }
    // Type casting is necessary if 'children' is not part of the Requisition type
    if ((node as EnhancedRequisition).children) {
      ;(node as EnhancedRequisition).children.forEach(traverse)
    }
  }

  // Start traversal from each root node
  tree.forEach(traverse)

  return result
}
/**
 *
 * @param tree
 * @returns
 */
function getNonRootApplicableNodesGroupedByRoot(
  tree: EnhancedRequisition[]
): { id: number; nodes: EnhancedRequisition[] }[] {
  const result: { id: number; nodes: EnhancedRequisition[] }[] = []

  // Recursive function to traverse the tree and filter applicable non-root nodes
  function traverse(
    node: EnhancedRequisition,
    nonRootApplicableNodes: EnhancedRequisition[]
  ) {
    // If the node is applicable and not at the root level (has a parent_id), add it to the list
    if (node.is_applicable && node.parent_id !== null) {
      nonRootApplicableNodes.push(node)
    }

    // Continue to traverse children if they exist
    if (node.children) {
      node.children.forEach((child) => traverse(child, nonRootApplicableNodes))
    }
  }

  // Iterate through the root nodes of the tree
  tree.forEach((rootNode) => {
    // Initialize an array to hold applicable non-root nodes for this root
    const nonRootApplicableNodes: EnhancedRequisition[] = []

    // If the root node is not applicable, do not add it to the result
    // but still traverse its children to find applicable non-root nodes
    traverse(rootNode, nonRootApplicableNodes)

    // If non-root applicable nodes were found, add them to the result
    if (nonRootApplicableNodes.length > 0) {
      result.push({ id: rootNode.id, nodes: nonRootApplicableNodes })
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
function findRootNodeBySequence(
  data: Requisition[],
  characterValue: number
): Requisition | undefined {
  const resp = data.find(
    (node) => node.sequence === characterValue && node.parent_id === null
  )
  return resp
}

/**
 *
 * @param arr
 * @returns
 */
function transformSequenceArray(arr?: number[]): string {
  // If arr is undefined, set it to an empty array
  arr = arr || []

  if (arr.length > 5) {
    throw new Error("Array should have at most 4 elements")
  }

  let result = ""

  if (arr.length > 0) {
    // @ts-ignore
    result += arr[0] + "."
  }

  if (arr.length > 1) {
    // @ts-ignore
    result += "" + arr[1] + "."
  }

  if (arr.length > 2) {
    // @ts-ignore
    result += " (" + String.fromCharCode(96 + arr[2]) + ")"
  }

  if (arr.length > 3) {
    // @ts-ignore
    result += " (" + numberToRoman(arr[3]) + ")"
  }

  if (arr.length > 4) {
    // @ts-ignore
    result += " (" + numberToRoman(arr[4]).toUpperCase() + ")"
  }

  return result.trim()
}

/**
 *
 * @param num
 * @returns
 */
export function numberToRoman(num: number): string {
  const roman: { [key: number]: string } = {
    1000: "m",
    900: "cm",
    500: "d",
    400: "cd",
    100: "c",
    90: "xc",
    50: "l",
    40: "xl",
    10: "x",
    9: "ix",
    5: "v",
    4: "iv",
    1: "i",
  }

  let str = ""

  for (let key of Object.keys(roman).reverse()) {
    const n = Math.floor(num / +key)
    num -= n * +key
    str += (roman[+key] as string).repeat(n) // Use type assertion here
  }

  return str
}

/**
 *
 * @param arr
 * @param level
 * @returns
 */
function sequenceFormat(arr?: number[], level?: number): string {
  // If arr is undefined, set it to an empty array
  arr = arr || []

  if (arr.length > 5) {
    throw new Error("Array should have at most 4 elements")
  }

  let result = ""

  if (!level || level === 1) {
    if (arr.length > 0) {
      // @ts-ignore
      return arr[0] + "."
    }
  }

  if (!level || level === 2) {
    if (arr.length > 1) {
      // @ts-ignore
      return arr[1] + "."
    }
  }

  if (!level || level === 3) {
    if (arr.length > 2) {
      // @ts-ignore
      return String.fromCharCode(96 + arr[2]) + "."
    }
  }

  if (!level || level === 4) {
    if (arr.length > 3) {
      // @ts-ignore
      return "(" + numberToRoman(arr[3]) + ")"
    }
  }

  if (!level || level === 5) {
    if (arr.length > 4) {
      // @ts-ignore
      return "(" + numberToRoman(arr[4]).toUpperCase() + ")"
    }
  }

  return result.trim()
}

/**
 * Replaces a value in the provided sequence at a specified level (position) with a new value.
 *
 * This function treats the array as "base 1". So, the first item in the array is considered to be at position 1,
 * the second item at position 2, and so on.
 *
 * @param sequence_in_levels - An array of numbers representing the sequence.
 * @param level - The position (base 1) in the sequence where the value should be replaced.
 * @param newValue - The new value to replace the existing value at the specified level.
 * @returns A new array with the value at the specified level replaced by the newValue.
 * @throws An error if the provided level is out of bounds.
 */
function replaceValueAtLevel(
  sequence_in_levels: number[],
  level: number,
  newValue: number
): number[] {
  // Adjust for base 1
  const adjustedLevel = level - 1

  // Check for valid level
  if (adjustedLevel < 0 || adjustedLevel >= sequence_in_levels.length) {
    throw new Error(
      `Invalid level provided: ${level}. It must be between 1 and ${sequence_in_levels.length}.`
    )
  }

  // Create a copy of the original array and replace the value at the specified level
  const result = [...sequence_in_levels]
  result[adjustedLevel] = newValue

  return result
}




/**
 * exports
 */
export {
  createRequisitionTree,
  findNodeByReqId,
  getHeaderNodes,
  getNonRootApplicableNodes,
  getNonRootApplicableNodesGroupedByRoot,
  findRootNodeBySequence,
  transformSequenceArray,
  sequenceFormat,
  replaceValueAtLevel,
}
