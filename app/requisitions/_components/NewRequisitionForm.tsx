"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { addEntry } from "../_actions/addnew"
import { FormData } from "./formTypes"
import { QueryField } from "./QueryField"
import { SequenceSelect } from "./SequenceSelect"
import { SubmitButton } from "./SubmitButton"
import { showErrorToast, showSuccessToast } from "./toastHelpers"

/**
 * Requisition Form Schema
 */
export const NewRequisitionFormSchema = z.object({
  query: z.string().trim().optional(),
  parent_id: z.number().optional(),
  sequence: z.coerce.string(),
  siblings: z.array(z.string()),
})

type NewRequisitionFormType = {
  parent_id?: Requisition["parent_id"]
  sequence: Requisition["sequence"]
  siblings?: Requisition["siblings"]
}

type ExtendedFormData = FormData & {
  id?: number
  sequence: string
  siblings: string[]
}

/**
 *
 * @returns
 */
export function NewRequisitionForm({
  parent_id,
  sequence,
  siblings,
}: NewRequisitionFormType) {
  const updatedSiblings = Array.isArray(siblings) ? siblings : [sequence]

  const formValues = {
    parent_id: parent_id === null ? undefined : parent_id,
    query: "",
    sequence: sequence === null ? "1" : sequence?.toString(),
    siblings: updatedSiblings.map((v) => v.toString()),
  }

  const form = useForm<ExtendedFormData>({
    resolver: zodResolver(NewRequisitionFormSchema),
    defaultValues: formValues,
  })
  const router = useRouter()

  async function clientAction() {
    const valid = await form.trigger()
    const errors = form.formState.errors

    if (!valid) {
      showErrorToast(errors)
      return
    }
    const result = NewRequisitionFormSchema.safeParse(form.getValues())

    // now process
    if (result.success) {
      try {
        const resp = await addEntry(result.data)
        console.log(
          "🚀 ~ file: NewRequisitionForm.tsx:80 ~ clientAction ~ resp:",
          resp
        )
        showSuccessToast(result.data)
        router.push(`/requisitions/create`)
      } catch (error: unknown) {
        showErrorToast(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form action={clientAction} className="space-y-6">
        <QueryField form={form} />

        <SequenceSelect
          sequence={formValues.sequence}
          siblings={formValues.siblings}
          //   sequence_in_levels={formValues.sequence}
        />

        <div className="flex flex-row justify-between">
          <SubmitButton>Submit</SubmitButton>
          <Button type="button" variant="ghost" asChild>
            <Link href={"./"}>Close</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
