"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  reqId: z.string(),
  reqReply: z.string(),
})

export function ReplyForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reqId: "",
      reqReply: "",
    },
    mode: "onBlur", // Set validation mode to onBlur
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // only submit if something has changed in the form
    console.log(form.formState.isDirty)
    if (form.formState.isDirty) console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onBlur={form.handleSubmit(onSubmit)}
        className=""
      >
        <FormField
          control={form.control}
          name="reqReply"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="reply..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reqId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="hidden" placeholder="reply..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
