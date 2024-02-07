import { CrossCircledIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import {
  TDocument,
  TTagFormData,
  useDeleteTagFromDocument,
} from "@/lib/hooks/useTags"
import { Badge } from "@/components/ui/badge"

type Props = {
  tag: TTagFormData
  documentId: TDocument["id"]
}

const CurrentBadge = ({ tag, documentId }: Props) => {
  const { mutate: deleteTag, status } = useDeleteTagFromDocument({
    onSuccess: () => toast.success("Tag removed!"),
    onError: (error) =>
      toast.error("Something went wrong. Could not remove tag. Try again."),
    documentId,
  })

  const deleteTagEvent = () => {
    deleteTag({ documentId, tagId: tag.id })
  }

  return (
    <Badge variant={"outline"}>
      {tag.tag_name}
      <CrossCircledIcon
        className="ml-4 size-4 cursor-pointer text-gray-600 transition-colors duration-150 ease-in-out hover:text-red-600 hover:drop-shadow-md"
        onClick={() => tag.id && deleteTagEvent()}
      />
    </Badge>
  )
}

export { CurrentBadge }
