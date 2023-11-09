import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// type
import { type EnhancedRequisition } from "@/types/RequisitionType"
// ui
import { DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"

// actions
import { insertRequisition } from "../_actions/insertRequisition"
import { updateRequisition } from "../_actions/updateRequisition"
// components
import { FieldsetWrapper } from "../_components/FieldsetWrapper"
import { IsReplyRequired } from "../_components/IsReplyRequired"
import { QueryInputField } from "../_components/QueryInputField"
import { SequenceSelect } from "../_components/SequenceSelect"
import { SubmitFormButton } from "../_components/SubmitFormButton"
// schema
import { FormSchema } from "./RequisitionFormSchema"

// Type for requisitions where 'id' is optional
type RequisitionWithOptionalId = Omit<EnhancedRequisition, "id"> & {
  id?: number
}

type FormProps = {
  requisition: RequisitionWithOptionalId
  afterSave: () => void
  setDialogClose?: () => void
}

/**
 *
 * @param param0
 * @returns
 */
export function RequisitionDialogForm({
  requisition,
  afterSave,
  setDialogClose,
}: FormProps) {
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
          await insertRequisition({ ...rest, is_required })
        } else if (id) await updateRequisition({ id, ...rest, is_required })
      } catch (error: unknown) {
        console.log(error)
        if (error instanceof z.ZodError) {
          console.log(error.errors) // This would log the error message "Query cannot be empty"
        }
      } finally {
        afterSave()
        if (setDialogClose !== undefined) {
          setDialogClose()
        }
      }
    }
  }

  return (
    <div className="p-4">
      <DialogTitle className="mb-6">
        <span className="text-xl underline decoration-primary decoration-double decoration-2 underline-offset-8">
          {requisition.id ? "Edit" : "New"} Query
        </span>
      </DialogTitle>
      <Form {...form}>
        <form action={requisitionFormAction} className="my-4">
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

export async function waitABit(howLong: number = 300): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, howLong))
}
