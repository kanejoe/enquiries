import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogClose } from "@/components/ui/dialog"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/Spinner"

// const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

export const FormSchema = z.object({
  id: z.number().int().nullable().optional(),
  query: z
    .string()
    .transform((str) => str.trim())
    // .refine((val) => val.length > 0, "Query cannot be empty.")
    .optional(),
  sequence: z.string().default("1"), // Coercion is not necessary if defaulting to string "1"
  parent_id: z.number().int().positive().nullable().optional(), // Ensure integers with .int()
  is_required: z.boolean().optional(), // The .default(true) is not necessary with .optional()
})

export function SubmitFormButton() {
  return (
    <div className="mt-8 space-x-6 text-right">
      <DialogClose asChild className="text-gray-600 hover:text-gray-800">
        <Button variant="ghost">Cancel</Button>
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
export function QueryInputField() {
  const { control } = useFormContext()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

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

/**
 *
 * @returns
 */
export function IsReplyRequired() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="is_required"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Is a Reply Required for this Requisition</FormLabel>
            <FormDescription>
              If not, this may be a heading only.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  )
}
