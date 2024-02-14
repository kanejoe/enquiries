import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { TagsTable } from "./TagsTable"
import { DrawerComponent } from "./ui/DrawerComponent"

type TagsListDrawerProps = {
  tagName?: string
}

const TagsListDrawer = ({ tagName }: TagsListDrawerProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      const params = new URLSearchParams(searchParams)
      params.delete("tag")
      replace(`${pathname}?${params.toString()}`)
    }
  }

  useEffect(() => {
    // This code checks if tagName is a non-empty string
    if (tagName && typeof tagName === "string" && tagName.trim() !== "") {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [tagName]) // This tells React to rerun the effect when tagName changes

  return (
    <DrawerComponent
      isOpen={open}
      isOpenChange={handleOpenChange}
      title={"Documents to Which this Tag Applies"}
    >
      {tagName ? <TagsTable tagName={tagName} /> : null}
    </DrawerComponent>
  )
}

export { TagsListDrawer }
