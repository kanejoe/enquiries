import { FC, useRef } from "react"
import { CloudArrowUpIcon } from "@heroicons/react/20/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { onSubmitAction } from "./file-upload-form-action"
import { FormSchema } from "./upload-form-schema"

interface FileUploadFormProps {
  fileToUpload: File
}

const FileUploadForm: FC<FileUploadFormProps> = ({ fileToUpload }) => {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { file: fileToUpload, ...(state?.fields ?? {}) },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData()
    formData.append("file", fileToUpload)
    formAction(formData)
  }

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg py-6 transition duration-300 ease-in-out">
      <Form {...form}>
        {state?.message !== "" && !state.issues && (
          <div className="text-red-500">{state.message}</div>
        )}
        {state?.issues && (
          <div className="text-red-500">
            <ul>
              {state.issues.map((issue) => (
                <li key={issue} className="flex gap-1">
                  <X fill="red" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          action={formAction}
          ref={formRef}
        >
          <div className="">
            <Button className="w-full" type="submit">
              <CloudArrowUpIcon className="mr-2 size-5" />
              Upload Document
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { FileUploadForm }
