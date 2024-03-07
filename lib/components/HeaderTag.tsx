import { usePathname, useRouter } from "next/navigation"
import { CrossCircledIcon } from "@radix-ui/react-icons"

import { TTagFormData } from "@/lib/hooks/use-tags"
import { Badge } from "@/components/ui/badge"

type Props = {
  tag_name: TTagFormData["tag_name"]
}

const HeaderTag = ({ tag_name }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  const deleteTagEvent = () => {
    router.push(pathname)
  }

  return (
    <Badge variant={"outline"} className="border-blue-500 bg-blue-50">
      <span className="cursor-pointer hover:text-gray-800">{tag_name}</span>
      <CrossCircledIcon
        className="ml-4 size-4 cursor-pointer text-blue-600 transition-colors duration-150 ease-in-out hover:text-blue-800 hover:drop-shadow-md"
        onClick={deleteTagEvent}
      />
    </Badge>
  )
}

export { HeaderTag }
