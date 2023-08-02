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

import { AtomicReq, useAtomicReqStore } from "./reqStore"

const FormSchema = z.object({
  isApplicable: z.boolean().default(false),
  reqId: z.string(),
})

interface IsApplicableSwitchFormProps {
  headingReq: AtomicReq
}

export function IsApplicableSwitchForm({
  headingReq,
}: IsApplicableSwitchFormProps) {
  const { toast } = useToast()
  const useAtomicReqActions = useAtomicReqStore((state) => state.actions)
  const { isApplicable, reqId } = headingReq

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isApplicable,
      reqId,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    useAtomicReqActions.patchIsApplicable(data.reqId, data.isApplicable)
    /*toast({
      title: "Requisition",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-200 p-4">
          <div className="font-semibold text-slate-900">
            <Check className="mr-2 inline-flex font-bold text-teal-700" />
            Updated to {data.isApplicable ? " Applicable" : " Not Applicable"}
          </div>
        </div>
      ),
    })*/
  }

  const descriptionCSS = cn(
    "transition delay-150",
    { "text-teal-800": isApplicable },
    { "text-red-800": !isApplicable }
  )

  const isApplicableBgCSS = cn(
    "rounded-lg transition delay-150",
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
                    } p-3 shadow-sm transition delay-150`}
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
                        className="data-[state=checked]:bg-teal-400 data-[state=unchecked]:bg-red-400"
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
