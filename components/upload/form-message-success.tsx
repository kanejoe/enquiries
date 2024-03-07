import Link from "next/link"
import { LightningBoltIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function FormMessageSuccess({
  message,
  fields,
}: {
  message: string
  fields?: Record<string, string>
}) {
  return (
    <Alert className="bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      <LightningBoltIcon className="mr-8 mt-0.5 size-5" />
      <AlertTitle className="text-xl font-semibold">Save Successful</AlertTitle>
      <AlertDescription className="">{message}</AlertDescription>
      <AlertDescription>
        <>
          {fields && fields.fileName && (
            <div className="mt-2 flex gap-1">
              <Badge variant="secondary" className="max-w-80 truncate">
                {fields.fileName}
              </Badge>
            </div>
          )}
          {fields && fields.wordCount && (
            <div className="mt-2 flex gap-1">
              {Number(fields.wordCount) ? (
                <Badge variant="secondary" className="max-w-80 truncate">
                  {Number(fields.wordCount).toLocaleString()} words
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="min-w-0 max-w-80 overflow-hidden truncate text-ellipsis"
                >
                  Document could not be Read
                </Badge>
              )}
            </div>
          )}
          {fields && fields.document_id && (
            <div className="mt-2 flex gap-1">
              <Link
                href={`/rag/files/${fields.document_id}`}
                className="font-semibold text-blue-500 hover:to-blue-700 hover:underline"
              >
                &raquo; Go to Document
              </Link>
            </div>
          )}
        </>
      </AlertDescription>
    </Alert>
  )
}

export { FormMessageSuccess }
