import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // data fetch hook
  const { mutate: deleteTag, status } = useDeleteTagFromDocument({
    onSuccess: () => toast.success("Tag removed!"),
    onError: (error) =>
      toast.error("Something went wrong. Could not remove tag. Try again."),
    documentId,
  })

  const deleteTagEvent = () => {
    deleteTag({ documentId, tagId: tag.id })
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <Badge variant={"outline"} className="border-emerald-500 bg-emerald-50">
      <span
        className="cursor-pointer hover:text-gray-800"
        onClick={() => {
          // <pathname>?tag=tag_name
          router.push(pathname + "?" + createQueryString("tag", tag.tag_name))
        }}
      >
        {tag.tag_name}
      </span>
      <CrossCircledIcon
        className="ml-4 size-4 cursor-pointer text-gray-600 transition-colors duration-150 ease-in-out hover:text-red-600 hover:drop-shadow-md"
        onClick={() => tag.id && deleteTagEvent()}
      />
    </Badge>
  )
}

export { CurrentBadge }
