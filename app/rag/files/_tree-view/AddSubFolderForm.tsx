import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useAddFolder, useAddSubFolder } from "@/lib/hooks/useFolders"
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

const noParentSchema = z.object({
  new_folder_name: z.string().min(3, {
    message: "Folder must be at least 3 characters.",
  }),
})

const withParentSchema = noParentSchema.extend({
  parent_id: z.number(),
  parent_folder_name: z.string(),
})

interface AddFolderFormProps {
  parent_id?: number
  parent_folder_name?: string
  afterSave: () => void
}

const AddFolderForm: FC<AddFolderFormProps> = ({
  parent_id,
  parent_folder_name,
  afterSave,
}) => {
  const { mutateAsync: addSubFolder, status: addSubFolderStatus } =
    useAddSubFolder({
      onSuccess: () => toast.success("Sub-folder added!"),
      onError: () =>
        toast.error(
          "Something went wrong. Could not add the folder. Try again"
        ),
    })
  const { mutateAsync: addFolder, status: addFolderStatus } = useAddFolder({
    onSuccess: () => toast.success("New folder added!"),
    onError: () =>
      toast.error("Something went wrong. Could not add the folder. Try again"),
  })

  const isPending =
    addSubFolderStatus === "pending" || addFolderStatus === "pending"
      ? true
      : false

  const formSchema = parent_id ? withParentSchema : noParentSchema
  const defaultValues = parent_id
    ? {
        parent_id: parent_id,
        parent_folder_name: parent_folder_name,
        new_folder_name: "",
      }
    : { new_folder_name: "" }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
    shouldUnregister: false,
  })

  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log("🚀 ~ onSubmit ~ values:", values)
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   const data = await (parent_id ? addSubFolder(values) : addFolder(values))
  //   afterSave()
  // }

  async function onSubmit(values: any) {
    if (parent_id) {
      const subFolderValues = values as z.infer<typeof withParentSchema>
      // Use subFolderValues after asserting the type
      const data = await addSubFolder(subFolderValues)
    } else {
      const folderValues = values as z.infer<typeof noParentSchema>
      // Use folderValues after asserting the type
      const data = await addFolder(folderValues)
    }
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
                name="new_folder_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {`${parent_id ? "New Sub-Folder" : "New Folder"}`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${parent_folder_name ? "add new sub-folder name" : "add new folder name"}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {parent_id ? (
                <input
                  {...form.register("parent_id", { value: parent_id })}
                  type="hidden"
                  className="hidden"
                />
              ) : null} */}

              {parent_folder_name ? (
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
              ) : null}

              <Button type="submit">
                <Spinner className="absolute h-4 w-4 group-enabled:opacity-0" />
                <span className="group-disabled:opacity-0">{`${parent_id ? "Add New Sub-Folder" : "Add New Folder"}`}</span>
              </Button>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { AddFolderForm }
