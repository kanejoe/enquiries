import { z } from "zod"

import { type EnhancedRequisition } from "./RequisitionType"

// Original Requisition Schema
const RequisitionSchema = z.object({
  id: z.number(),
  has_doc: z.boolean().default(false),
  is_applicable: z.boolean().default(false),
  is_complete: z.boolean().default(false),
  is_flagged: z.boolean().default(false),
  is_required: z.boolean().default(false),
  parent_id: z.union([z.number(), z.null()]).optional(),
  query: z.union([z.string(), z.null()]).optional(),
  reply: z.union([z.string(), z.null()]).optional(),
  sequence: z.number(),
})

// TypeScript type for Requisition
export type Requisition = z.infer<typeof RequisitionSchema>

// Define a function to create the EnhancedRequisitionSchema
function createEnhancedRequisitionSchema(): z.ZodSchema<EnhancedRequisition> {
  return RequisitionSchema.extend({
    children: z.array(z.lazy(() => createEnhancedRequisitionSchema())),
    sequence_in_levels: z.array(z.number()),
    siblings: z.array(z.number()),
    level: z.number(),
  })
}

// Create the EnhancedRequisitionSchema
const EnhancedRequisitionSchema = createEnhancedRequisitionSchema()

const NoIdRequisitionSchema = RequisitionSchema.extend({
  //   id: z.union([z.number(), z.null()]).optional(),
  sequence_in_levels: z.array(z.number()),
  siblings: z.array(z.number()),
  level: z.number(),
}).omit({ id: true })

// Export the schema
export { EnhancedRequisitionSchema, RequisitionSchema, NoIdRequisitionSchema }
