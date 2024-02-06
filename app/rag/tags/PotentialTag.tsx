import { FC } from "react"
import { toast } from "sonner"

import { useAddDocumentTag, useAddTag } from "@/lib/hooks/useTags"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/Spinner"

interface PotentialTagProps {
  tag: string
}

const PotentialTag: FC<PotentialTagProps> = ({ tag }) => {
  const { mutate: addDocumentTag } = useAddDocumentTag({
    onSuccess: () => toast.success("Document successfully tagged."),
    onError: (error) =>
      toast.error("Something went wrong. Could not add tag. Try again."),
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
      { tag_name: tag },
      {
        onSuccess(data, variables, context) {
          addDocumentTag({ documentId: 2, tagId: data.id })
        },
      }
    )
  }

  return (
    <Badge variant={"secondary"} onClick={clickTag} className="cursor-pointer">
      {tag}
      {status === "pending" ? <Spinner className="ml-2 size-4" /> : null}
    </Badge>
  )
}

export { PotentialTag }
