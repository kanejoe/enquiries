"use client"

import { toast } from "sonner"

import { useFoldersWithDocuments } from "@/lib/hooks/useFolders"
import { searchFolders } from "@/lib/organise-folders"

import { TreeViewApp } from "./_tree-view"
import { Dropzone } from "./upload/Dropzone"
import { FileUploadForm } from "./upload/FileUploadForm"

/**
 *
 * @returns
 */
export default function FilesPage() {
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
    <div className="container mt-8 font-albertsans">
      <div className="grid h-128 grid-cols-6 gap-x-20">
        <div className="col-span-4">
          {foldersWithDocs ? (
            <TreeViewApp treeData={foldersWithDocs} />
          ) : foldersPending ? (
            <p>Loading...</p>
          ) : null}
        </div>
        <div className="col-span-2">
          {/* <FileUploadForm /> */}
          <Dropzone />
        </div>
      </div>
    </div>
  )
}
