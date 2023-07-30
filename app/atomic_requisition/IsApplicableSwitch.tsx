"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
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

import { useReqStore } from "./store"

const FormSchema = z.object({
  isApplicable: z.boolean().default(false),
  reqId: z.string(),
})

export function IsApplicableSwitchForm() {
  const { toast } = useToast()
  const [reqId, isApplicable, updateIsApplicable] = useReqStore((state) => [
    state.reqId,
    state.isApplicable,
    state.updateIsApplicable,
  ])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isApplicable,
      reqId,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateIsApplicable(data.isApplicable)
    toast({
      title: "Requisition",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-200 p-4">
          <div className="font-semibold text-slate-900">
            <Check className="mr-2 inline-flex font-bold text-teal-700" />
            Updated to {data.isApplicable ? " Applicable" : " Not Applicable"}
          </div>
        </div>
      ),
    })
  }

  const descriptionCSS = cn(
    "",
    { "text-teal-800": isApplicable },
    { "text-red-800": !isApplicable }
  )

  const isApplicableBgCSS = cn(
    "rounded-lg",
    { "bg-teal-50": isApplicable },
    { "bg-red-50": !isApplicable }
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={`flex flex-row-reverse items-center space-x-2 lg:flex-row`}
        >
          <div className={isApplicableBgCSS}>
            <FormField
              control={form.control}
              name="isApplicable"
              render={({ field }) => {
                return (
                  <FormItem
                    className={`flex flex-row items-center justify-between rounded-lg border ${
                      isApplicable ? "border-teal-300" : "border-red-300"
                    } p-3 shadow-sm`}
                  >
                    <div className="mr-4 space-y-0.5">
                      <FormLabel>Is the Requisition Applicable?</FormLabel>
                      <FormDescription className={descriptionCSS}>
                        {isApplicable
                          ? "Requisition is Applicable"
                          : "Not Applicable in its entirety"}
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
        </div>
      </form>
    </Form>
  )
}
