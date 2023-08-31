"use client"

import { memo, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

import { isRequiredAction } from "../_actions/isRequiredAction"

export const IsRequiredFormSchema = z.object({
  is_required: z.boolean().default(true),
  id: z.number(),
})

type IdAndIsRequired = Pick<Requisition, "id" | "is_required">

/**
 *
 * @param param0
 * @returns
 */
function IsRequiredSwitchForm({ id, is_required }: IdAndIsRequired) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof IsRequiredFormSchema>>({
    resolver: zodResolver(IsRequiredFormSchema),
    defaultValues: {
      id,
      is_required,
    },
  })

  const { watch, handleSubmit } = form

  // Watch the value of 'is_required'
  const isRequired = watch("is_required")

  function onSubmit(data: z.infer<typeof IsRequiredFormSchema>) {
    startTransition(() => {
      isRequiredAction(data)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="is_required"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="mt-2 flex space-x-4">
                <FormLabel className="leading-4">Reply Required?</FormLabel>
                <FormDescription className="leading-4">
                  {isRequired ? "Yes, required." : "No, not required."}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e)
                    handleSubmit(onSubmit)()
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default memo(IsRequiredSwitchForm)
