"use client"

import { toast } from "sonner"

import { searchFolders } from "@/lib/hooks/organise-folders"
import { useFolders } from "@/lib/hooks/useFolders"

import { TreeViewApp } from "./_tree-view"
import { DropComponent } from "./upload/DropComponent"

/**
 *
 * @returns
 */
export default function FilesPage() {
  const {
    data: folders,
    error: foldersError,
    isPending: foldersPending,
  } = useFolders()
  // if (folders)
  //   console.log("🚀 ~ FilesPage ~ folders:", searchFolders(folders, "Con"))

  if (foldersError) {
    toast.error("Error", {
      description: `${foldersError.message.replace("\n", "")}`,
    })
  }

  return (
    <div className="container mt-8 font-albertsans">
      <div className="grid h-128 grid-cols-6 gap-x-20">
        <div className="col-span-4">
          {folders ? (
            <TreeViewApp treeData={folders} />
          ) : foldersPending ? (
            <p>Loading...</p>
          ) : null}
        </div>
        <div className="col-span-2">
          <DropComponent />
        </div>
      </div>
    </div>
  )
}
