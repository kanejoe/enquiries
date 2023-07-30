"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  isApplicable: z.boolean().default(false),
  reqId: z.string(),
})

export function IsApplicableSwitchForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isApplicable: true,
      reqId: "dfak",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ file: IsApplicableSwitch.tsx:35 ~ onSubmit ~ data:", data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row-reverse items-center space-x-2 lg:flex-row">
          <FormField
            control={form.control}
            name="isApplicable"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="mr-4 space-y-0.5">
                    <FormLabel>Is Applicable?</FormLabel>
                    <FormDescription>
                      This Requisition is Applicable
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(e) => {
                        field.onChange(e)
                        form.handleSubmit(onSubmit)()
                      }}
                    />
                  </FormControl>
                </FormItem>
              )
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="reqId"
            render={({ field }) => {
              return (
                <FormItem className="">
                  <FormControl>
                    <Input {...field} type="hidden" />
                  </FormControl>
                </FormItem>
              )
            }}
          ></FormField>
        </div>
      </form>
    </Form>
  )
}
