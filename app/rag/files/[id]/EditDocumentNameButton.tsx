import { FC, useState } from "react"
import { FilePenLine } from "lucide-react"

import { TDocument } from "@/lib/hooks/useTags"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { EditDocumentNameForm } from "./DocumentNameForm"

interface EditDocumentNameButtonProps {
  documentId: TDocument["id"]
  documentName: TDocument["name"]
}

const EditDocumentNameButton: FC<EditDocumentNameButtonProps> = ({
  documentId,
  documentName,
}) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false)

  return (
    <>
      <FilePenLine
        onClick={(e) => {
          e.stopPropagation() // to stop the parent onClick event
          setIsFolderOpen(true)
        }}
        className="ml-2 mt-px size-4 shrink-0 cursor-pointer transition hover:text-blue-700"
      />

      <Dialog open={isFolderOpen} onOpenChange={setIsFolderOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Document Details</DialogTitle>
            <DialogDescription>
              Make changes and click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <EditDocumentNameForm
            documentId={documentId}
            documentName={documentName}
            afterSave={() => setIsFolderOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export { EditDocumentNameButton }
