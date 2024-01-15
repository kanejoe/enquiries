"use client"

import { toast } from "sonner"

import { useFolders } from "@/lib/hooks/useFolders"

import { TreeViewApp } from "./tree-view/"
import { DropComponent } from "./upload/DropComponent"

export default function FilesPage() {
  const {
    data: folders,
    error: foldersError,
    isPending: foldersPending,
  } = useFolders()

  if (foldersError) {
    toast.error("Error", {
      description: `${foldersError.message.replace("\n", "")}`,
    })
  }

  return (
    <div className="container mt-8 font-albertsans">
      <div className="grid h-128 grid-cols-2 gap-x-8">
        <div className="">
          {folders ? (
            <TreeViewApp treeData={folders} />
          ) : foldersPending ? (
            <p>Loading...</p>
          ) : null}
        </div>
        <DropComponent />
      </div>
    </div>
  )
}
