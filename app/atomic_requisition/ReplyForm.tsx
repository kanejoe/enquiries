"use client"

import { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import _ from "lodash"
import { ArrowDownWideNarrow, Dot, Sparkles } from "lucide-react"
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
  })

  const { watch } = form
  const replyText = watch("reply")

  const adjustHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "inherit" // reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // then set it to scrollHeight
    }
  }

  function handleMenuItemClick(item: string) {
    useAtomicReqActions.patchReply(reqId, item)
  }

  // Define a function to handle the submission, with 1 second debounce
  const debouncedSubmit = useCallback(
    _.debounce((value: string) => {
      // Handle the submission here
      useAtomicReqActions.patchReply(reqId, value)
    }, 1000),
    []
  )

  useEffect(() => {
    if (replyText !== undefined) {
      debouncedSubmit(replyText)
    }
    // This will cancel the debounce on component unmount
    return () => {
      debouncedSubmit.cancel()
    }
  }, [replyText, debouncedSubmit])

  useEffect(() => {
    form.setValue("reply", reply)
  }, [reply])

  useLayoutEffect(() => {
    adjustHeight() // adjust the height when component mounts
  }, [])

  useLayoutEffect(() => {
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
    "Declined",
  ]

  return (
    <Form {...form}>
      <form>
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
                    className="min-h-[32px] flex-1 pr-16 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500 dark:text-slate-900 dark:placeholder:text-slate-500"
                  />
                </FormControl>
                <div className="">
                  <Menubar className="absolute right-3 top-1 border-0 bg-transparent px-0 py-1">
                    <MenubarMenu>
                      <MenubarTrigger className="mr-1 hover:cursor-pointer">
                        <Sparkles
                          size={20}
                          color="#949494"
                          strokeWidth={1.5}
                          className="mx-0"
                        />
                      </MenubarTrigger>
                      <MenubarContent className="w-64 font-albertsans">
                        <MenubarLabel className="flex flex-row bg-slate-50">
                          <ArrowDownWideNarrow size={20} strokeWidth={1.5} />
                          <span className="ml-2 text-sm">
                            Select Precedent Text
                          </span>
                        </MenubarLabel>
                        {presets.map((preset) => {
                          return (
                            <>
                              <MenubarItem
                                className="ml-1.5 whitespace-normal break-words text-sm"
                                onSelect={() => handleMenuItemClick(preset)}
                              >
                                {/* <Dot className="text-slate-600" /> */}
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
