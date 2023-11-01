import { useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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

import { SequenceSelect } from "../_components/SequenceSelect"

const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

const FormSchema = z.object({
  id: z.number().optional(),
  query: z.string().optional().default(""),
  sequence: z.coerce.string().default("1"),
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: requisition.id,
      query: requisition.query || "",
      sequence: requisition?.sequence ? requisition?.sequence.toString() : "1",
    },
    shouldUnregister: true, // https://react-hook-form.com/docs/useform#shouldUnregister
  })

  async function clientAction() {
    const valid = await form.trigger()
    const errors = form.formState.errors
    console.log(
      "🚀 ~ file: dialog-form.tsx:51 ~ clientAction ~ errors:",
      errors
    )

    if (!valid) {
      return
    }
    const result = FormSchema.safeParse(form.getValues())
    if (result.success) {
      try {
        console.log(
          "🚀 ~ file: dialog-form.tsx:56 ~ clientAction ~ result:",
          result
        )
      } catch (error: unknown) {
        console.log(
          "🚀 ~ file: dialog-form.tsx:57 ~ clientAction ~ error:",
          error
        )
      }
    }
  }

  return (
    <div className="p-4">
      <DialogTitle>Edit Requisition</DialogTitle>
      <Form {...form}>
        <form
          //   action={clientAction}
          className="my-4 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            console.log(form.getValues())
            wait().then(() => afterSave())
          }}
        >
          {/** some inputs */}
          {/* <QueryInputField /> */}
          <FormField
            control={form.control}
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

          <SequenceSelect
            sequence={requisition?.sequence}
            siblings={requisition?.siblings}
            sequence_in_levels={requisition.sequence_in_levels}
          />

          <div className="mt-8 space-x-6 text-right">
            <DialogClose className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
              Cancel
            </DialogClose>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

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
