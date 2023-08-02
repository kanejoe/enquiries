"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Switch from "@radix-ui/react-switch"
import { CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormField, FormItem } from "@/components/ui/form"

import { AtomicReq, useAtomicReqStore } from "./reqStore"

interface isCompleteProps {
  isComplete: AtomicReq["isComplete"]
  reqId: AtomicReq["reqId"]
}

const FormSchema = z.object({
  isComplete: z.boolean().default(false),
  reqId: z.string(),
})

export function IsCompleteForm({ isComplete, reqId }: isCompleteProps) {
  const useAtomicReqActions = useAtomicReqStore((state) => state.actions)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isComplete,
      reqId,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    useAtomicReqActions.patchIsComplete(data.reqId, data.isComplete)
  }

  useEffect(() => {
    form.setValue("isComplete", isComplete)
  }, [isComplete])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="isComplete"
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
                    <CheckCircle2
                      size={21}
                      className={`${
                        field.value === true
                          ? "fill-teal-400"
                          : "fill-yellow-200"
                      } text-gray-900 transition-colors hover:cursor-pointer dark:text-gray-300`}
                      strokeWidth={1.25}
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
