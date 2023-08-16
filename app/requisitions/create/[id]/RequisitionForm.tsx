"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Requisition } from "@/types/RequisitionType"
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
import { toast } from "@/components/ui/use-toast"

const data = {
  id: 20,
  parent_id: 18,
  sequence: 2,
  query:
    "If so, furnish a list of same and give the Vendor’s estimate of value",
  reply: null,
  is_applicable: true,
  has_doc: false,
  is_complete: false,
  is_flagged: false,
  children: [],
  siblings: [1, 3],
  level: 2,
  sequence_array: [1, 2],
}

const FormSchema = z.object({
  query: z.string().optional(),
  id: z.number().optional(),
  parent_id: z.number().optional(),
  sequence: z.coerce.number().optional(),
})

export function RequisitionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ file: RequisitionForm.tsx:57 ~ onSubmit ~ data:", data)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="sequence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Order</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sequence" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.siblings.map((sibling, idx) => {
                    return (
                      <SelectItem value={sibling.toString()} key={idx}>
                        {sibling}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormDescription>Select the order of the query.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </Form>
  )
}
