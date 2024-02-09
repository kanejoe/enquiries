"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useUpdateDocumentName } from "@/lib/hooks/useFolders"
import { TDocument } from "@/lib/hooks/useTags"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/Spinner"

const editDocumentNameSchema = z.object({
  name: z.string().min(2, {
    message: "document name must be at least 2 characters.",
  }),
})

function EditDocumentNameForm({
  documentId,
  documentName,
  afterSave,
}: {
  documentId: TDocument["id"]
  documentName: TDocument["name"]
  afterSave: () => void
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
    afterSave()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={status === "pending"} className="group space-y-4">
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
            <span className="inline-flex items-center justify-center">
              <span className="group-disabled:opacity-0">Save</span>
              <Spinner className="absolute size-4 group-enabled:opacity-0" />
            </span>
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}

export { EditDocumentNameForm }
