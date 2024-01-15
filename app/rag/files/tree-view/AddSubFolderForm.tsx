import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useAddSubFolder } from "@/lib/hooks/useFolders"
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

const formSchema = z.object({
  parent_id: z.number(),
  parent_folder_name: z.string().min(3, {
    message: "Folder must be at least 3 characters.",
  }),
  new_folder_name: z.string().min(3, {
    message: "Folder must be at least 3 characters.",
  }),
})

interface AddSubFolderFormProps {
  id: number
  folder_name: string
}

const AddSubFolderForm: FC<AddSubFolderFormProps> = ({ id, folder_name }) => {
  const { mutateAsync: addSubFolder, error } = useAddSubFolder({
    onSuccess: () => toast.success("Sub-folder added!"),
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parent_id: id,
      parent_folder_name: folder_name,
      new_folder_name: "",
    },
    shouldUnregister: false,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const data = await addSubFolder(values)
    console.log("🚀 ~ onSubmit ~ data:", data)
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="new_folder_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Folder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="folder name" {...field} />
                  </FormControl>
                  <FormDescription className="ml-0.5">
                    Add the new sub-folder name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input
              {...form.register("parent_id", { value: id })}
              type="hidden"
              className="hidden"
            />

            <fieldset disabled={true}>
              <FormField
                name="parent_folder_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Folder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="parent folder"
                        {...field}
                        className="font-semibold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { AddSubFolderForm }
