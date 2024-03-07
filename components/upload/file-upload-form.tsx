import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form as FormProvider } from "@/components/ui/form"

import { FileUploadButton } from "./file-upload-button"
import { onSubmitAction } from "./file-upload-form-action"
import { UploadFormMessageError } from "./form-message-error"
import { FormMessageSuccess } from "./form-message-success"
import { FormSchema } from "./upload-form-schema"

interface FileUploadFormProps {
  fileToUpload: File
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }
  },
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
      <FormProvider {...form}>
        {/* Success State: Message is present and there are no issues */}
        {state?.message !== "" && !state?.issues && (
          <motion.div
            key="success"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="mx-auto -mt-6 w-5/6"
          >
            <FormMessageSuccess message={state.message} fields={state.fields} />
          </motion.div>
        )}

        {/* Error State: Issues are present */}
        {state?.issues && (
          <motion.div
            key="error"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <UploadFormMessageError issues={state.issues} />
          </motion.div>
        )}

        {/* Default State: No specific message or issues, just the file upload form */}
        {!state?.message && !state?.issues && (
          <motion.form
            key="form"
            custom={-1}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            action={formActionWithFile}
          >
            <FileUploadButton />
          </motion.form>
        )}
      </FormProvider>
    </div>
  )
}

export { FileUploadForm }
