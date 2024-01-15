import { useState } from "react"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddSubFolderForm } from "./AddSubFolderForm"

type AddSubFolderProps = {
  id: number
  folder_name: string
}

export const AddSubFolderDialog = ({
  id,
  folder_name,
}: AddSubFolderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusCircledIcon className="invisible inline-flex h-5 w-5 items-center text-slate-700 group-hover:visible hover:text-slate-700" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sub-Folder</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>

        <AddSubFolderForm id={id} folder_name={folder_name} />
      </DialogContent>
    </Dialog>
  )
}
