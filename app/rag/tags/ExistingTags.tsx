import { FC } from "react"
import { toast } from "sonner"

import { Tables } from "@/lib/database.types"
import { useAddDocumentTag } from "@/lib/hooks/useTags"
import { Badge } from "@/components/ui/badge"

type TTags = Tables<"tags">
type TMinimalTag = Pick<TTags, "id" | "tag_name">

interface ExistingTagsProps {
  tag: TMinimalTag
}

const ExistingTags: FC<ExistingTagsProps> = ({ tag }) => {
  const { mutate: updateTag, status } = useAddDocumentTag({
    onSuccess: () => toast.success("Successfully tagged."),
    onError: (error) =>
      toast.error("Something went wrong. Could not add tag. Try again."),
  })

  const addTag = () => {
    updateTag({ documentId: 2, tagId: tag.id })
  }

  return (
    <Badge variant={"default"} onClick={addTag} className="cursor-pointer">
      {tag.tag_name}
    </Badge>
  )
}

export { ExistingTags }
