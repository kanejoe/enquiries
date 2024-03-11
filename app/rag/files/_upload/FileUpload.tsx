import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useAddStorageFile } from "@/lib/hooks/use-files"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  file: z
    .object({
      name: z.string(),
      mimetype: z.string(),
      size: z.number(),
    })
    .refine((file) => file.size <= 10000000, {
      // 10 MB size limit
      message: "File size must be less than 10 MB.",
    }),
})

interface FileUploadProps {
  id: string
}

const FileUpload: FC<FileUploadProps> = ({ id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const {
    mutate: uploadFile,
    // error: addFileError,
    data: uploadedFile,
    isPending,
  } = useAddStorageFile({
    onSuccess: () => toast.success("File uploaded successfully!"),
    onError: () =>
      toast.error("Error", {
        description: `There was an error uploading the file. Please try again.`,
      }),
  })
  // console.log("🚀 ~ uploadedFile:", uploadedFile)

  // if (addFileError) {
  //   toast.error("Error", {
  //     description: `There was an error uploading the file. Please try again.  ${addFileError.message}`,
  //   })
  // }

  return (
    <div className="flex h-32 flex-col items-center justify-center pb-4">
      <Form {...form}>
        <form className="">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id={id}
                    className="hidden"
                    type="file"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    {...field}
                    value={field?.value?.name}
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const selectedFile = e.target.files?.[0]
                      if (selectedFile) {
                        uploadFile(selectedFile)
                      }
                    }}
                  />
                </FormControl>
                {/* <FormDescription className="ml-4">
                  PDF, MS Word DOC
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export { FileUpload }
