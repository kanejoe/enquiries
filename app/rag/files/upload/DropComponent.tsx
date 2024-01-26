import { FC, useCallback, useEffect, useState } from "react"
import {
  ArrowUpTrayIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { Cross2Icon } from "@radix-ui/react-icons"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"

import { getFileExtension, getIconForFileType } from "@/lib/fileIcons"
import { cn, convertFileSize } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { SelectFolders } from "./SelectFolders"

interface DropComponentProps {}

const DropComponent: FC<DropComponentProps> = (props) => {
  return (
    <div
      className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dotted border-primary bg-primary/5 p-8 text-center shadow shadow-primary/20 transition hover:bg-primary/15"
      {...getRootProps({})}
    >
      <input {...getInputProps({ name: "file" })} />

      <div className="flex flex-col items-center justify-center gap-4">
        <CloudArrowUpIcon className="h-8 w-8 fill-secondary-foreground" />
        {isDragActive ? (
          <p>Drop your file here ...</p>
        ) : (
          <p className="text-balance">
            Drag & drop file here, or click to select
          </p>
        )}
      </div>
    </div>
  )
}

export { DropComponent }
