import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { acceptedFormats } from "../helpers/acceptedFormats"

export const useCustomDropzone = () => {
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    console.log(acceptedFiles)
    console.log(fileRejections)

    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0]

      if (
        firstRejection &&
        firstRejection.errors &&
        firstRejection.errors[0]?.code === "file-invalid-type"
      ) {
        toast.error("Invalid file type. Please upload a valid file.")
      } else {
        toast.error("Error uploading file.")
      }
      return
    }
  }

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    maxSize: 100000000 * 1, // 1 MB
    accept: acceptedFormats,
  })

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    open,
  }
}
