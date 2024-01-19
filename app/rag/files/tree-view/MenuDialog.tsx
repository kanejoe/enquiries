import { useState } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { FolderDown, FolderPen } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AddSubFolderForm } from "./AddSubFolderForm"
import { EditFolderForm } from "./EditFolderForm"

type MenuDialogProps = {
  id: number
  folder_name: string
}

export const MenuDialog = ({
  id,
  folder_name,
}: MenuDialogProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
  const [editFolderDialogOpen, setEditFolderDialogOpen] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted focus-visible:invisible"
            onClick={(e) => {
              e.stopPropagation() // to stop the parent onClick event
              setIsOpen(true)
            }}
          >
            <DotsHorizontalIcon className="invisible h-4 w-4 group-hover:visible" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[220px]">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation() // to stop the parent onClick event
              setIsNewFolderDialogOpen(true)
              setIsOpen(false)
            }}
          >
            <FolderDown className="mr-2 w-5 text-slate-600" /> Add New
            Sub-Folder
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation() // to stop the parent onClick event
              setEditFolderDialogOpen(true)
              setIsOpen(false)
            }}
          >
            <FolderPen className="mr-2 w-5 text-slate-600" /> Edit Folder Name
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <>
        <AddSubFolder
          id={id}
          folder_name={folder_name}
          isNewFolderDialogOpen={isNewFolderDialogOpen}
          setIsNewFolderDialogOpen={setIsNewFolderDialogOpen}
        />
        <EditFolderName
          id={id}
          folder_name={folder_name}
          editFolderDialogOpen={editFolderDialogOpen}
          setEditFolderDialogOpen={setEditFolderDialogOpen}
        />
      </>
    </>
  )
}

interface AddSubFolderProps {
  id: number
  folder_name: string
  isNewFolderDialogOpen: boolean
  setIsNewFolderDialogOpen: (value: boolean) => void
}

const AddSubFolder = ({
  id,
  folder_name,
  isNewFolderDialogOpen,
  setIsNewFolderDialogOpen,
}: AddSubFolderProps): JSX.Element => {
  return (
    <Dialog
      open={isNewFolderDialogOpen}
      onOpenChange={setIsNewFolderDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sub-Folder</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>

        <AddSubFolderForm
          id={id}
          folder_name={folder_name}
          afterSave={() => setIsNewFolderDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

interface EditFolderNameProps {
  id: number
  folder_name: string
  editFolderDialogOpen: boolean
  setEditFolderDialogOpen: (value: boolean) => void
}

const EditFolderName = ({
  id,
  folder_name,
  editFolderDialogOpen,
  setEditFolderDialogOpen,
}: EditFolderNameProps): JSX.Element => {
  return (
    <Dialog open={editFolderDialogOpen} onOpenChange={setEditFolderDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Folder Name</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>

        <EditFolderForm
          id={id}
          folder_name={folder_name}
          afterSave={() => setEditFolderDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
