import { useQuery } from "@tanstack/react-query"

import { ensureUniqueSequence } from "@/lib/treeUtils"

import { bulkUpdate } from "../_actions/bulkUpdateReqs"
import { findSiblingsReqsById } from "../_actions/findSiblingsReqsById"
import { getAllRequisitionsAction } from "../_actions/actions"
// import { RecursiveTree } from "@/components/RecursiveTree"

// import { RequisitionCard } from "../_components/RequisitionCard"
// import { FlattenedTree } from "./FlattenTree"
// import { data } from "./data"
// import NewStructure from "./NewStructure"

export interface CardContainerProps {}

export { CardContainer }
