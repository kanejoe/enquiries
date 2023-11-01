import { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
// @ts-expect-error
import { useFormStatus } from "react-dom"
import { useForm, useFormContext } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogTitle } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/Spinner"

import { SequenceSelect } from "../_components/SequenceSelect"

const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

const FormSchema = z.object({
  id: z.number().optional(),
  query: z.string().optional().default(""),
  sequence: z.coerce.string().default("1"),
  parent_id: z.number().positive().nullable().optional(),
})

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
    },
    shouldUnregister: true,
  })

  async function requisitionFormAction() {
    const valid = await form.trigger()
    // const errors = form.formState.errors
    await waitThreeSeconds()

    if (!valid) {
      return
    }
    const result = FormSchema.safeParse(form.getValues())
    if (result.success) {
      try {
        const data = { ...result.data, sequence: Number(result.data.sequence) }
        console.log(
          "🚀 ~ file: dialog-form.tsx:64 ~ requisitionFormAction ~ data:",
          data
        )
      } catch (error: unknown) {
        console.log(error)
      } finally {
        wait().then(() => afterSave())
      }
    }
  }
  async function waitThreeSeconds() {
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }

  return (
    <div className="p-4">
      <DialogTitle>Edit Requisition</DialogTitle>
      <Form {...form}>
        <form action={requisitionFormAction} className="my-4 space-y-4">
          {/** some inputs */}
          <FieldsetWrapper>
            <QueryInputField />
            <SequenceSelect
              siblings={requisition?.siblings}
              sequence_in_levels={requisition.sequence_in_levels}
              level={requisition.level}
            />
            <SubmitFormButton />
          </FieldsetWrapper>
        </form>
      </Form>
    </div>
  )
}

function FieldsetWrapper({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <fieldset disabled={pending} className="group space-y-4">
      {children}
    </fieldset>
  )
}

function SubmitFormButton() {
  return (
    <div className="mt-8 space-x-6 text-right">
      <DialogClose className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
        Cancel
      </DialogClose>
      <Button type="submit" className="group-disabled:pointer-events-none">
        <Spinner className="absolute h-4 group-enabled:opacity-0" />
        <span className="group-disabled:opacity-0">Save</span>
      </Button>
    </div>
  )
}

/**
 *
 * @returns
 */
function QueryInputField() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="query"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>Requisition Query</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter the Requisition Query"
                className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:text-slate-900 dark:placeholder:text-slate-500"
                ref={textareaRef}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
