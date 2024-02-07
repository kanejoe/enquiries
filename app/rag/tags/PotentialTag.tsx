import { FC } from "react"
import { toast } from "sonner"

import { useAddDocumentTag, useAddTag } from "@/lib/hooks/useTags"
import type { TDocument, TTagFormData } from "@/lib/hooks/useTags"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/Spinner"

interface PotentialTagProps {
  tag_name: TTagFormData["tag_name"]
  documentId: TDocument["id"]
}

const PotentialTag: FC<PotentialTagProps> = ({ tag_name, documentId }) => {
  const { mutate: addDocumentTag } = useAddDocumentTag({
    onSuccess: () => toast.success("Document successfully tagged."),
    onError: (error) =>
      toast.error("Something went wrong. Could not add tag. Try again."),
    documentId,
  })

  const { mutate: addNewTagName, status } = useAddTag({
    onSuccess: () => {
      toast.success("Tag name added!")
    },
    onError: (error) =>
      toast.error(
        "Something went wrong. Could not save new tag name. Try again."
      ),
  })

  const clickTag = () => {
    addNewTagName(
      { tag_name },
      {
        onSuccess(data, variables, context) {
          addDocumentTag({ documentId, tagId: data.id })
        },
      }
    )
  }

  return (
    <Badge variant={"secondary"} onClick={clickTag} className="cursor-pointer">
      {tag_name}
      {status === "pending" ? <Spinner className="ml-2 size-4" /> : null}
    </Badge>
  )
}

export { PotentialTag }
