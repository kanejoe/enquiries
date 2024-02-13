import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useEditFolderName } from "@/lib/hooks/useFolders"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/Spinner"

const formSchema = z.object({
  id: z.number(),
  folder_name: z.string().min(3, {
    message: "Folder must be at least 3 characters.",
  }),
})

interface EditFolderFormProps {
  id: number
  folder_name: string
  afterSave: () => void
}

const EditFolderForm: FC<EditFolderFormProps> = ({
  id,
  folder_name,
  afterSave,
}) => {
  const { mutate: editFolderName, status } = useEditFolderName({
    onSuccess: () => toast.success("Folder name changed!"),
    onError: (error) =>
      toast.error("Something went wrong. Could not save. Try again."),
  })

  const isPending = status === "pending" ? true : false

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      folder_name,
    },
    shouldUnregister: false,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    editFolderName(values)
    afterSave()
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <fieldset disabled={isPending} className="group space-y-6">
              <FormField
                control={form.control}
                name="folder_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edit Folder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="folder name" {...field} />
                    </FormControl>
                    {/* <FormDescription className="ml-0.5">
                      Add the new sub-folder name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                {...form.register("id", { value: id })}
                type="hidden"
                className="hidden"
              />

              <Button type="submit">
                <Spinner className="absolute h-4 w-4 group-enabled:opacity-0" />
                <span className="group-disabled:opacity-0">Save</span>
              </Button>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { EditFolderForm }
