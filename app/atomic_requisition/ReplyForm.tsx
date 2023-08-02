"use client"

import { useEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sparkles } from "lucide-react"
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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Textarea } from "@/components/ui/textarea"

import { AtomicReq, useAtomicReqStore } from "./reqStore"

const formSchema = z.object({
  reqId: z.string(),
  reply: z.string().optional(),
})

interface ReplyFormProps {
  reqId: AtomicReq["reqId"]
  reply?: AtomicReq["reply"]
}

export function ReplyForm({ reply, reqId }: ReplyFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const useAtomicReqActions = useAtomicReqStore((state) => state.actions)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reqId: reqId,
      reply: reply,
    },
    // mode: "onBlur", // Set validation mode to onBlur
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("🚀 ~ file: ReplyForm.tsx:45 ~ onSubmit ~ values:", values)
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

  function handleMenuItemClick(item: string) {
    useAtomicReqActions.patchReply(reqId, item)
  }

  useEffect(() => {
    form.setValue("reply", reply)
  }, [reply])

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

  const presets = [
    "Not Applicable",
    "Yes",
    "No",
    "See Special Conditions of Contract for Sale",
  ]

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
              <FormItem className="relative flex">
                <FormControl>
                  <Textarea
                    placeholder="reply..."
                    {...field}
                    ref={textareaRef}
                    className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 min-h-[32px] flex-1 pr-14 dark:text-slate-900 dark:placeholder:text-slate-500"
                  />
                </FormControl>
                <div className="">
                  <Menubar className="absolute right-3 top-1 border-0 bg-transparent px-0 py-1">
                    <MenubarMenu>
                      <MenubarTrigger className="hover:cursor-pointer">
                        <Sparkles size={20} color="#949494" strokeWidth={1.5} />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarLabel className="bg-slate-50">
                          ↓ Select an Option ↓
                        </MenubarLabel>
                        {presets.map((preset) => {
                          return (
                            <>
                              <MenubarItem
                                className="text-xs"
                                onSelect={() => handleMenuItemClick(preset)}
                              >
                                {preset}
                              </MenubarItem>
                              <MenubarSeparator />
                            </>
                          )
                        })}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
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
