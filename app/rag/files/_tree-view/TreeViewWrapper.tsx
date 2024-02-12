"use client"

import { FC } from "react"
import { toast } from "sonner"

import { useFoldersWithDocuments } from "@/lib/hooks/useFolders"

import { TreeViewApp } from "./TreeView"

interface TreeViewWrapperProps {}

const TreeViewWrapper: FC<TreeViewWrapperProps> = () => {
  const {
    data: foldersWithDocs,
    error: foldersError,
    isPending: foldersPending,
  } = useFoldersWithDocuments()

  if (foldersError) {
    toast.error("Error", {
      description: `${foldersError.message.replace("\n", "")}`,
    })
  }

  return (
    <div>
      {foldersWithDocs ? (
        <TreeViewApp treeData={foldersWithDocs} />
      ) : foldersPending ? (
        <p>Loading...</p>
      ) : null}
    </div>
  )
}

export { TreeViewWrapper }
