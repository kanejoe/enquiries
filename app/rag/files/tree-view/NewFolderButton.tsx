import { FC, useState } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"

import { Button } from "@/components/ui/button"

import { AddSubFolder } from "./MenuDialog"

interface NewFolderButtonProps {}

const NewFolderButton: FC<NewFolderButtonProps> = () => {
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation() // to stop the parent onClick event
          setIsNewFolderDialogOpen(true)
        }}
        className="bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Add New Top Level Folder
      </Button>
      <AddSubFolder
        isNewFolderDialogOpen={isNewFolderDialogOpen}
        setIsNewFolderDialogOpen={setIsNewFolderDialogOpen}
      />
    </>
  )
}

export { NewFolderButton }
