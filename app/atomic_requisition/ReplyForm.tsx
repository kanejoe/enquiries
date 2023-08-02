"use client"

import { useEffect, useRef } from "react"
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
import { Textarea } from "@/components/ui/textarea"

import { AtomicReq } from "./reqStore"

const formSchema = z.object({
  reqId: z.string(),
  reply: z.string(),
})

interface ReplyFormProps {
  reply: AtomicReq["reply"]
  reqId: AtomicReq["reqId"]
}

export function ReplyForm({ reply, reqId }: ReplyFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reqId: reqId,
      reply: reply,
    },
    mode: "onBlur", // Set validation mode to onBlur
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ file: ReplyForm.tsx:45 ~ onSubmit ~ values:", values)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // only submit if something has changed in the form
    if (form.formState.isDirty) console.log(values)
  }

  const adjustHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "inherit" // reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // then set it to scrollHeight
    }
  }

  useEffect(() => {
    adjustHeight() // adjust the height when component mounts
  }, [])

  useEffect(() => {
    const textareaNode = textareaRef.current
    const handleInput = (e: any) => {
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + "px"
    }

    textareaNode?.addEventListener("input", handleInput)
    return () => textareaNode?.removeEventListener("input", handleInput)
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onBlur={form.handleSubmit(onSubmit)}
        className=""
      >
        <fieldset className="group">
          <FormField
            control={form.control}
            name="reply"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="reply..."
                    {...field}
                    ref={textareaRef}
                    className="min-h-[32px] dark:text-slate-900 dark:placeholder:text-slate-500"
                  />
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
                  <Input className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
      </form>
    </Form>
  )
}
