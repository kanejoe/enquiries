"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as Switch from "@radix-ui/react-switch"
import { FileText } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormField, FormItem } from "@/components/ui/form"

import { AtomicReq, useAtomicReqStore } from "./reqStore"

interface HasDocProps {
  hasDoc: AtomicReq["hasDoc"]
  reqId: AtomicReq["reqId"]
}

const FormSchema = z.object({
  hasDoc: z.boolean().default(false),
  reqId: z.string(),
})

export function HasDocForm({ hasDoc, reqId }: HasDocProps) {
  const useAtomicReqActions = useAtomicReqStore((state) => state.actions)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hasDoc,
      reqId,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    useAtomicReqActions.patchHasDoc(data.reqId, data.hasDoc)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="hasDoc"
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
                    <FileText
                      size={21}
                      color="black"
                      strokeWidth={1.25}
                      className={`${
                        field.value === true ? "fill-teal-400" : "fill-none"
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
