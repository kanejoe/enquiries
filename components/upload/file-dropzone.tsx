import { FC } from "react"
import { UploadCloud } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface DropzoneProps {
  setFileToUpload: (file: File | undefined) => void
}

const Dropzone: FC<DropzoneProps> = ({ setFileToUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropRejected: (fileRejections) => {
      const name = fileRejections[0]?.file.name // Add null check here
      setFileToUpload(undefined)
      toast.error(`File ${name} is not supported`)
    },
    onDropAccepted: (acceptedFile: File[]) => {
      if (acceptedFile && acceptedFile.length > 0) {
        setFileToUpload(undefined)
        setFileToUpload(acceptedFile[0]) // Fix: Pass the first element of the acceptedFile array
      }
    },
    maxFiles: 1,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  })
  return (
    <>
      <label
        {...getRootProps()}
        className={cn(
          "relative flex w-full flex-col items-center justify-center py-6 transition duration-300 ease-in-out",
          "cursor-pointer rounded-lg border border-dashed hover:bg-accent hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
          isDragActive
            ? "border-yellow-600 bg-yellow-100 "
            : "border-gray-300 bg-gray-50"
        )}
      >
        <div className="text-center">
          <div
            className={cn(
              "mx-auto max-w-min rounded-md border p-2",
              isDragActive
                ? "scale-110 transform border-yellow-600 bg-yellow-100 transition duration-300 ease-in-out"
                : "border-gray-300 bg-gray-50"
            )}
          >
            <UploadCloud size={20} />
          </div>

          {isDragActive ? (
            <p className="mt-2 text-base text-gray-600">
              <span className="font-semibold text-yellow-900">
                Drop your File Here
              </span>
            </p>
          ) : (
            <p className="mt-2 text-base text-gray-600">
              <span className="font-semibold">
                Drag and Drop File or Click to Upload
              </span>
            </p>
          )}
          <p
            className={cn(
              "text-sm",
              isDragActive ? "text-yellow-900" : "text-gray-600"
            )}
          >
            pdf or docx files only
          </p>
        </div>
      </label>
      <Input
        {...getInputProps({ name: "file", accept: ".pdf,.docx" })}
        id="dropzone-file"
        type="file"
        className="hidden"
      />
    </>
  )
}

export { Dropzone }
