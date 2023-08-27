"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { updateRequisition } from "../_actions/update"
import { QueryField } from "./QueryField"
import { SequenceSelect } from "./SequenceSelect"
import { SubmitButton } from "./SubmitButton"
import { showErrorToast, showSuccessToast } from "./toastHelpers"

/**
 * Requisition Form Schema
 */
export const FormSchema = z.object({
  query: z.string().trim().optional(),
  id: z.number(),
  parent_id: z.number().optional(),
  sequence: z.coerce.string(),
  siblings: z.array(z.string()),
})

type RequisitionFormType = {
  selectedNode: Requisition | null
}

/**
 *
 * @returns
 */
export function RequisitionForm({ selectedNode }: RequisitionFormType) {
  const updatedNode = {
    id: selectedNode?.id,
    sequence: selectedNode?.sequence ? selectedNode?.sequence.toString() : "1",
    query: selectedNode?.query || null || undefined,
    parent_id: selectedNode?.parent_id || null || undefined,
    sequence_in_levels: selectedNode?.sequence_in_levels,
    siblings: selectedNode?.siblings?.map((v) => v.toString()),
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: updatedNode,
  })
  const router = useRouter()

  async function clientAction() {
    const valid = await form.trigger()
    const errors = form.formState.errors

    if (!valid) {
      showErrorToast(errors)
      return
    }
    const result = FormSchema.safeParse(form.getValues())
    if (result.success) {
      try {
        const data = { ...result.data, sequence: Number(result.data.sequence) }
        await updateRequisition(data)
        showSuccessToast(result.data)
        router.push("/requisitions/create")
      } catch (error: unknown) {
        showErrorToast(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form action={clientAction} className="space-y-6">
        <QueryField form={form} />

        {updatedNode.siblings && updatedNode.sequence_in_levels ? (
          <SequenceSelect
            sequence={updatedNode?.sequence}
            siblings={updatedNode?.siblings}
            sequence_in_levels={updatedNode.sequence_in_levels}
          />
        ) : null}

        <div className="flex flex-row justify-between">
          <SubmitButton>Submit</SubmitButton>
          <Button type="button" variant="ghost" asChild>
            <Link href={"../"}>Close</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
