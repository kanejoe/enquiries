import { FC } from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UploadFormMessageErrorProps {
  issues: string[]
}

const UploadFormMessageError: FC<UploadFormMessageErrorProps> = ({
  issues,
}) => {
  return (
    <Alert className="max-w-[20em] bg-red-50">
      <ExclamationTriangleIcon className="size-5" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <ul>
          {issues.map((issue) => (
            <li key={issue} className="flex gap-1">
              {issue}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}

export { UploadFormMessageError }
