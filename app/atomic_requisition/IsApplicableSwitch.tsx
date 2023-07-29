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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  isApplicable: z.boolean().default(false),
})

export function IsApplicableSwitchForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isApplicable: true,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
            render={({ field }) => (
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
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        </div>
      </form>
    </Form>
  )
}

/*
 <Label htmlFor="heading-applicable-mode" className="ml-2">
              Is this Requisition Applicable?
            </Label>
            <Switch checked={field.value}
                      onCheckedChange={field.onChange} />*/
