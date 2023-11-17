import { useRef } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

/**
 *
 * @returns
 */

export function QueryInputField({
  fieldLabel = "Requisition / Query",
  queryPlaceholder = "Enter the Requisition Query",
}: {
  fieldLabel?: string
  queryPlaceholder?: string
}) {
  const { control } = useFormContext()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <FormField
      control={control}
      name="query"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-foreground">{fieldLabel}</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={queryPlaceholder}
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
