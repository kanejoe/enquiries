"use client"

import { useLayoutEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { addEntry } from "./_actions"

const data = {
  id: 20,
  parent_id: 18,
  sequence: 1,
  query:
    "Confirm that the Vendor shall furnish on closing an indemnity in favour of the Purchaser in respect of any dispute that is before the RTB relating to the property indemnifying the Purchaser from any damages and/or costs awarded in relation to the dispute.",
  reply: null,
  is_applicable: true,
  has_doc: false,
  is_complete: false,
  is_flagged: false,
  children: [],
  siblings: [1, 2, 3],
  level: 2,
  sequence_array: [1, 2],
}

const newData = {
  ...data,
  sequence: data.sequence.toString(),
}

export const FormSchema = z.object({
  query: z.string().trim().optional(),
  id: z.number(),
  parent_id: z.number().optional(),
  sequence: z.coerce.string(),
})

/**
 *
 * @returns
 */
export function RequisitionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: newData,
  })

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const { watch } = form
  const sequenceValue = watch("sequence")

  async function clientAction(formData: FormData) {
    const valid = await form.trigger()
    const errors = form.formState.errors

    if (!valid) {
      toast({
        title: "The following errors occurred:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white/80">
              {JSON.stringify(errors, null, 2)}
            </code>
          </pre>
        ),
      })
      return
    }
    const result = FormSchema.safeParse(form.getValues())
    if (result.success) {
      await addEntry(result.data)
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white/80">
              {JSON.stringify(result.data, null, 2)}
            </code>
          </pre>
        ),
      })
    }
  }

  const adjustHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "inherit" // reset the height
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 6
      }px` // then set it to scrollHeight plus a bit to disappear the scrollbar
    }
  }

  useLayoutEffect(() => {
    adjustHeight() // adjust the height when component mounts
  }, [])

  useLayoutEffect(() => {
    const textareaNode = textareaRef.current
    const handleInput = (e: any) => {
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + 6 + "px"
    }
    textareaNode?.addEventListener("input", handleInput)
    return () => textareaNode?.removeEventListener("input", handleInput)
  }, [])

  return (
    <Form {...form}>
      <form action={clientAction} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="type in the query..."
                  className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500"
                  ref={textareaRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="sequence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Order</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sequence" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.siblings.map((sibling, idx) => {
                      return (
                        <SelectItem value={sibling.toString()} key={idx}>
                          {sibling}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormDescription className="tabular-nums">
                  Currently: {transformSequenceArray(newData.sequence_array)}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </Form>
  )
}
