import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import { DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"

import { updateRequisition } from "../_actions/update"
import { SequenceSelect } from "../_components/SequenceSelect"
import { addRequisition } from "./actions"
import {
  FormSchema,
  IsReplyRequired,
  QueryInputField,
  SubmitFormButton,
} from "./dialog-form"
import { FieldsetWrapper } from "./FieldsetWrapper"

/**
 *
 * @param param0
 * @returns
 */

export function DialogForm({
  requisition,
  afterSave,
}: {
  requisition: Requisition
  afterSave: () => void
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: requisition.id,
      query: requisition.query || "",
      sequence: requisition?.sequence ? requisition?.sequence.toString() : "1",
      parent_id: requisition.parent_id ?? null,
      is_required: requisition.is_required ?? true,
    },
    shouldUnregister: true,
  })

  async function requisitionFormAction() {
    const valid = await form.trigger()
    if (!valid) return

    await waitABit()

    const result = FormSchema.safeParse(form.getValues())

    if (result.success) {
      try {
        const data = { ...result.data, sequence: Number(result.data.sequence) }
        const { id, is_required, ...rest } = data

        if (id === undefined) {
          let newData = await addRequisition({ ...rest, is_required })
          // await updateRequisition({
          //   id: newData.id,
          //   ...rest,
          //   is_required,
          // })
        }

        if (id)
          await updateRequisition({
            id: id ?? undefined,
            ...rest,
            is_required,
          })
      } catch (error: unknown) {
        console.log(
          "🚀 ~ file: DialogForm.tsx:66 ~ requisitionFormAction ~ error:",
          error
        )
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
        <span className="rounded-sm bg-gradient-to-r from-primary to-primary/50 px-3 py-1.5 text-foreground shadow-sm">
          {requisition.id ? "Edit" : "New"} Requisition
        </span>
      </DialogTitle>
      <Form {...form}>
        <form action={requisitionFormAction} className="my-4">
          {/** some inputs */}
          <FieldsetWrapper>
            <QueryInputField />
            <IsReplyRequired />
            <SequenceSelect
              siblings={requisition?.siblings}
              sequence_in_levels={requisition.sequence_in_levels}
              level={requisition.level}
            ></SequenceSelect>
            <SubmitFormButton />
          </FieldsetWrapper>
        </form>
      </Form>
    </div>
  )
}

async function waitABit() {
  await new Promise((resolve) => setTimeout(resolve, 300))
}
