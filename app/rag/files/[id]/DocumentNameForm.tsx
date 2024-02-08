"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useUpdateDocumentName } from "@/lib/hooks/useFolders"
import { TDocument } from "@/lib/hooks/useTags"
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

const editDocumentNameSchema = z.object({
  name: z.string().min(2, {
    message: "document name must be at least 2 characters.",
  }),
})

function EditDocumentNameForm({
  documentId,
  documentName,
}: {
  documentId: TDocument["id"]
  documentName: TDocument["name"]
}) {
  const form = useForm<z.infer<typeof editDocumentNameSchema>>({
    resolver: zodResolver(editDocumentNameSchema),
    defaultValues: {
      name: documentName,
    },
  })

  const { mutate: updateDocumentName, status } = useUpdateDocumentName({
    onSuccess: () => toast.success("Document name updated!"),
    onError: (error) =>
      toast.error(
        "Something went wrong. Could not save new document name. Try again."
      ),
  })

  // This useEffect will run when `incomingValue` changes
  useEffect(() => {
    // Update the form field with the new value
    form.setValue("name", documentName)
  }, [documentName, form.setValue])

  function onSubmit(data: z.infer<typeof editDocumentNameSchema>) {
    updateDocumentName({
      id: documentId,
      name: data.name,
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Update Document Name</FormLabel>
              <FormControl>
                <Input placeholder="document name..." {...field} />
              </FormControl>
              {/* <FormDescription>Document or file name</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export { EditDocumentNameForm }
