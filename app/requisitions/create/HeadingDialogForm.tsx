import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { EnhancedRequisition } from "@/types/RequisitionType"
// type
import { waitABit } from "@/lib/waitABit"
// ui
import { DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"

// actions
import { insertRequisition } from "../_actions/insertRequisition"
import { updateRequisition } from "../_actions/updateRequisition"
// components
import { FieldsetWrapper } from "../_components/FieldsetWrapper"
import { QueryInputField } from "../_components/QueryInputField"
import { SequenceSelect } from "../_components/SequenceSelect"
import { SubmitFormButton } from "../_components/SubmitFormButton"

export const HeadingFormSchema = z.object({
  id: z.number().optional(),
  query: z.union([z.string(), z.null()]),
  sequence: z.number().min(1, { message: "Sequence must be 1 or greater" }),
  parent_id: z.null().optional(), // means it returns null or undefined
  siblings: z
    .array(z.number())
    .nonempty({ message: "Siblings cannot be empty" }),
  sequence_in_levels: z
    .array(z.number())
    .nonempty({ message: "Sequence in levels cannot be empty" }),
  level: z.number().min(1, { message: "Level must be 1 or greater" }),
  is_required: z.boolean().optional(),
})

const EHeadingFormSchema = HeadingFormSchema.extend({
  query: z.string().nonempty({ message: "The Heading cannot be empty" }),
  sequence: z.coerce
    .number()
    .min(1, { message: "Sequence must be 1 or greater" }),
  is_required: z.boolean().default(false),
  parent_id: z.union([z.number().nullish(), z.null()]).default(null),
}).omit({ level: true, siblings: true, sequence_in_levels: true })

type FormProps = {
  headingData: {
    sequence: EnhancedRequisition["sequence"]
    level: EnhancedRequisition["level"]
    query: EnhancedRequisition["query"]
    siblings: EnhancedRequisition["siblings"]
    sequence_in_levels: EnhancedRequisition["sequence_in_levels"]
    id?: EnhancedRequisition["id"]
  }
  afterSave: () => void
}

/**
 *
 * @param param0
 * @returns
 */
export function HeadingDialogForm({ headingData, afterSave }: FormProps) {
  const form = useForm<z.infer<typeof HeadingFormSchema>>({
    resolver: zodResolver(EHeadingFormSchema),
    defaultValues: {
      id: headingData.id ?? undefined,
      level: headingData.level,
      parent_id: undefined,
      query: headingData.query || "",
      sequence: headingData?.sequence ? headingData?.sequence : 1,
      sequence_in_levels: headingData.sequence_in_levels,
      siblings: headingData.siblings,
    },
    shouldUnregister: true,
  })

  async function requisitionFormAction() {
    const valid = await form.trigger()
    if (!valid) return
    await waitABit()

    const result = EHeadingFormSchema.safeParse(form.getValues())
    if (result.success) {
      try {
        const data = { ...result.data, sequence: Number(result.data.sequence) }
        const { id, ...rest } = data
        if (id === undefined) {
          await insertRequisition({ ...rest })
        } else if (id) await updateRequisition({ id, ...rest })
      } catch (error: unknown) {
        console.log(error)
        if (error instanceof z.ZodError) {
          console.log(error.errors) // This would log the error message "Query cannot be empty"
        }
      } finally {
        afterSave()
      }
    }
  }

  return (
    <div className="p-4">
      <DialogTitle className="mb-6">
        <span className="text-xl underline decoration-primary decoration-double decoration-2 underline-offset-8">
          {headingData.id ? "Edit Existing" : "Add New"} Heading
        </span>
      </DialogTitle>
      <Form {...form}>
        <form action={requisitionFormAction} className="my-4">
          <FieldsetWrapper>
            <QueryInputField fieldLabel="Heading Details" />
            <SequenceSelect
              siblings={headingData?.siblings}
              sequence_in_levels={headingData.sequence_in_levels}
              level={headingData.level}
            ></SequenceSelect>
            <SubmitFormButton />
          </FieldsetWrapper>
        </form>
      </Form>
    </div>
  )
}
