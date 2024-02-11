import { FC } from "react"

import { UploadDocumentModal } from "@/lib/components/UploadDocumentModal"
import { useCustomDropzone as useDropzone } from "@/lib/hooks/useDropzone"
import { cn } from "@/lib/utils"

interface CustomDropzoneProps {}

const CustomDropzone: FC<CustomDropzoneProps> = (props) => {
  const { getInputProps, getRootProps, isDragActive, open } = useDropzone()

  return (
    <div {...getRootProps()}>
      CustomDropzone Component
      <div
        className={cn(
          "flex h-full w-full flex-1 flex-col items-center justify-stretch overflow-hidden",
          "transition-colors duration-500 ease-out dark:bg-black"
        )}
      >
        <div
          className={`flex h-full w-full max-w-4xl flex-1 flex-col overflow-hidden dark:shadow-primary/25`}
        >
          <UploadDocumentModal />
        </div>
      </div>
    </div>
  )
}

export { CustomDropzone }
