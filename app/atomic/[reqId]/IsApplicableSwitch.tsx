"use client"

import { type AtomicRequisition } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
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

import { IsApplicableAction } from "./IsApplicableAction"

// import { useAtomicReqStore } from "../app/atomic_requisition/reqStore"

const FormSchema = z.object({
  isApplicable: z.boolean().default(false),
  reqId: z.string(),
})

interface IsApplicableSwitchFormProps {
  headingReq: AtomicRequisition
}

export function IsApplicableSwitchForm({
  headingReq,
}: IsApplicableSwitchFormProps) {
  // const useAtomicReqActions = useAtomicReqStore((state) => state.actions)
  const { isApplicable, reqId } = headingReq

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isApplicable,
      reqId,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log("🚀 ~ file: IsApplicableSwitch.tsx:49 ~ onSubmit ~ data:", data)
    // useAtomicReqActions.patchIsApplicable(data.reqId, data.isApplicable)
    IsApplicableAction(data)
  }

  const descriptionCSS = cn(
    "transition delay-150 font-semibold pt-1.5",
    { "text-caribbean-800": isApplicable },
    { "text-red-800": !isApplicable }
  )

  const isApplicableBgCSS = cn(
    "rounded-lg transition delay-150",
    { "bg-caribbean-50": isApplicable },
    { "bg-red-50": !isApplicable }
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={`flex flex-row-reverse items-center space-x-2  lg:flex-row`}
        >
          <div className={isApplicableBgCSS}>
            <FormField
              control={form.control}
              name="isApplicable"
              render={({ field }) => {
                return (
                  <FormItem
                    className={`flex flex-row items-center justify-between rounded-lg border ${
                      isApplicable ? "border-caribbean-500" : "border-red-300"
                    } p-3 shadow-sm transition delay-150`}
                  >
                    <div className="mr-4 space-y-0.5">
                      {/* <FormLabel>Is the Requisition Applicable?</FormLabel> */}
                      <FormDescription className={descriptionCSS}>
                        {isApplicable
                          ? "Requisition is Applicable"
                          : "Not Applicable in its entirety"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="transition-colors data-[state=checked]:bg-caribbean-500 data-[state=unchecked]:bg-red-400"
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
