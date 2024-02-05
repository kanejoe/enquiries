import React from "react"
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { TTagFormData, useDeleteTag } from "@/lib/hooks/useTags"
import { Badge } from "@/components/ui/badge"

type Props = {
  tag: TTagFormData
}

const BadgeIcon = ({ tag }: Props) => {
  const { mutate: deleteTag, status } = useDeleteTag({
    onSuccess: () => toast.success("Tag deleted!"),
    onError: (error) =>
      toast.error("Something went wrong. Could not delete tag. Try again."),
  })

  const deleteTagEvent = (id: number) => {
    deleteTag(id)
  }

  return (
    <Badge variant={"outline"}>
      {tag.tag_name}
      <CrossCircledIcon
        className="ml-4 size-4 cursor-pointer text-gray-600 transition-colors duration-150 ease-in-out hover:text-red-600 hover:drop-shadow-md"
        onClick={() => tag.id && deleteTagEvent(tag.id)}
      />
    </Badge>
  )
}

export { BadgeIcon }
