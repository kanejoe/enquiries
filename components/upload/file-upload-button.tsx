import { FC } from "react"
import CloudArrowUpIcon from "@heroicons/react/20/solid/CloudArrowUpIcon"
// @ts-expect-error
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

import { Spinner } from "../Spinner"

interface FileUploadButtonProps {}

const FileUploadButton: FC<FileUploadButtonProps> = () => {
  const status = useFormStatus()
  const pending = status.pending

  return (
    <Button
      className="inline-flex w-48 active:translate-y-px"
      type="submit"
      disabled={pending}
      variant={"default"}
    >
      {pending ? (
        <Spinner className="mr-4 size-5" />
      ) : (
        <CloudArrowUpIcon className="mr-4 size-5" />
      )}
      <span className="w-32">
        {pending ? "Uploading..." : "Upload Document"}
      </span>
    </Button>
  )
}

export { FileUploadButton }
