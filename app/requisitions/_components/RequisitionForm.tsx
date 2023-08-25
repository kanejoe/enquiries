"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { addEntry } from "../create/[id]/_actions"
import { SubmitButton } from "./SubmitButton"

export const FormSchema = z.object({
  query: z.string().trim().optional(),
  id: z.number(),
  parent_id: z.number().optional(),
  sequence: z.coerce.string(),
})

type RequisitionFormType = {
  selectedNode: Requisition | null
}

/**
 *
 * @returns
 */
export function RequisitionForm({ selectedNode }: RequisitionFormType) {
  const updatedNode = {
    id: selectedNode?.id,
    sequence: selectedNode?.sequence.toString(),
    query: selectedNode?.query || null || undefined,
    parent_id: selectedNode?.parent_id || null || undefined,
    sequence_array: selectedNode?.sequence_array,
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: updatedNode,
  })
  const router = useRouter()

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const { watch } = form
  const sequenceValue = watch("sequence")

  async function clientAction() {
    const valid = await form.trigger()
    const errors = form.formState.errors

    if (!valid) {
      toast({
        title: "The following errors occurred:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white/80">
              {JSON.stringify(errors, null, 2)}
            </code>
          </pre>
        ),
      })
      return
    }
    const result = FormSchema.safeParse(form.getValues())
    if (result.success) {
      try {
        const data = { ...result.data, sequence: Number(result.data.sequence) }
        await addEntry(data)
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white/80">
                {JSON.stringify(result.data, null, 2)}
              </code>
            </pre>
          ),
        })
        // route back
        router.push("/requisitions/create")
      } catch (error: unknown) {
        console.log(
          "🚀 ~ file: RequisitionForm.tsx:90 ~ clientAction ~ error:",
          error
        )
      }
    }
  }

  const adjustHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "inherit" // reset the height
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 6
      }px` // then set it to scrollHeight plus a bit to disappear the scrollbar
    }
  }

  useLayoutEffect(() => {
    adjustHeight() // adjust the height when component mounts
  }, [])

  useLayoutEffect(() => {
    const textareaNode = textareaRef.current
    const handleInput = (e: any) => {
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + 6 + "px"
    }
    textareaNode?.addEventListener("input", handleInput)
    return () => textareaNode?.removeEventListener("input", handleInput)
  }, [])

  return (
    <Form {...form}>
      <form action={clientAction} className="space-y-6">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="type in the query..."
                  className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500"
                  ref={textareaRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="sequence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Order</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sequence" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedNode?.siblings
                      ?.sort((a, b) => a - b)
                      .map((sibling: any, idx: number) => {
                        return (
                          <SelectItem value={sibling.toString()} key={idx}>
                            {sibling}
                          </SelectItem>
                        )
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Badge
            variant="secondary"
            className="mb-0.5 h-8 self-end rounded text-base"
          >
            {transformSequenceArray(updatedNode.sequence_array)}
          </Badge>
        </div>

        <div className="flex flex-row justify-between">
          <SubmitButton>Submit</SubmitButton>
          <Button type="button" variant="ghost" asChild>
            <Link href={"../"}>Close</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
