"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as Switch from "@radix-ui/react-switch"
import { Flag } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormField, FormItem } from "@/components/ui/form"

import { AtomicReq, useAtomicReqStore } from "./reqStore"

interface FlaggedProps {
  isFlagged: AtomicReq["isFlagged"]
  reqId: AtomicReq["reqId"]
}

const FormSchema = z.object({
  isFlagged: z.boolean().default(false),
  reqId: z.string(),
})

export function FlaggedForm({ isFlagged, reqId }: FlaggedProps) {
  const useAtomicReqActions = useAtomicReqStore((state) => state.actions)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isFlagged,
      reqId,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    useAtomicReqActions.patchIsFlagged(data.reqId, data.isFlagged)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="isFlagged"
          render={({ field }) => {
            return (
              <FormItem>
                <Switch.Root
                  className="disabled:cursor-not-allowed"
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e)
                    form.handleSubmit(onSubmit)()
                  }}
                >
                  <Switch.Thumb asChild>
                    <Flag
                      size={21}
                      strokeWidth={1.75}
                      className={`${
                        field.value === true ? "fill-red-500" : "fill-none"
                      } text-gray-900 transition-colors hover:cursor-pointer dark:text-gray-300`}
                    />
                  </Switch.Thumb>
                </Switch.Root>
              </FormItem>
            )
          }}
        ></FormField>
      </form>
    </Form>
  )
}
