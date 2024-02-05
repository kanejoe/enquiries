"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useAddTag } from "@/lib/hooks/useTags"
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
import { Input } from "@/components/ui/input"

const tagFormSchema = z.object({
  tag_name: z.string().min(2, {
    message: "tag name must be at least 2 characters.",
  }),
})

export function TagForm() {
  const form = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag_name: "",
    },
  })

  const { mutate: addNewTagName, status } = useAddTag({
    onSuccess: () => toast.success("Tag name added!"),
    onError: (error) =>
      toast.error(
        "Something went wrong. Could not save new tag name. Try again."
      ),
  })

  function onSubmit(data: z.infer<typeof tagFormSchema>) {
    addNewTagName(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tag_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Input placeholder="tag name..." {...field} />
              </FormControl>
              <FormDescription>Tags which apply to documents.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
