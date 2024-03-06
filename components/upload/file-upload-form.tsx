import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form } from "@/components/ui/form"

import { FileUploadButton } from "./file-upload-button"
import { onSubmitAction } from "./file-upload-form-action"
import { UploadFormMessageError } from "./form-message-error"
import { FormMessageSuccess } from "./form-message-success"
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

  const formData = new FormData()
  formData.append("file", fileToUpload)
  const formActionWithFile = formAction.bind(null, formData)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-lg py-6 transition duration-300 ease-in-out">
      <Form {...form}>
        {state?.message !== "" && !state.issues && (
          <div className="w-72">
            <FormMessageSuccess message={state.message} />
          </div>
        )}
        {state?.issues && <UploadFormMessageError issues={state.issues} />}
        <form action={formActionWithFile}>
          <div className="">
            <FileUploadButton />
          </div>
        </form>
      </Form>
    </div>
  )
}

export { FileUploadForm }
