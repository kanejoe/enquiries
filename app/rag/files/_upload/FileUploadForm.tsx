import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { useAddStorageFile } from "@/lib/hooks/use-files"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.any()

interface FileUploadProps {}

const FileUploadForm: FC<FileUploadProps> = () => {
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {},
  //   })

  const form = useForm({})

  const onSubmit = async (values) => {
    console.log("🚀 ~ values:", values)
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="file"
                    type="file"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    {...field}
                    value={field?.value?.name}
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const selectedFile = e.target.files?.[0]
                      console.log("🚀 ~ selectedFile:", selectedFile)
                      //   if (selectedFile) {
                      //     uploadFile(selectedFile)
                      //   }
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export { FileUploadForm }
