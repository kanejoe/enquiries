"use client"

import { FC, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Dropzone } from "@/components/upload/file-dropzone"
import { FileUploadForm } from "@/components/upload/file-upload-form"
import { FileViewer } from "@/components/upload/file-viewer"

export const UploadComponent: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [fileToUpload, setFileToUpload] = useState<File>()

  const removeAll = () => setFileToUpload(undefined)
  const isFileToUpload = fileToUpload !== undefined

  return (
    <div className="">
      <motion.div
        className="mx-auto mb-12 mt-8 h-24 w-128"
        transition={{ duration: 0.5 }}
        layout // This prop is used to animate layout changes
      >
        <AnimatePresence>
          {isFileToUpload ? (
            <motion.div
              key="fileUploadForm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <FileUploadForm fileToUpload={fileToUpload} />
            </motion.div>
          ) : (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <Dropzone setFileToUpload={setFileToUpload} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {fileToUpload && fileToUpload !== undefined ? (
        <div className="mx-h-[10em] group relative mx-auto flex max-w-screen-lg items-center justify-center gap-2 overflow-hidden rounded-lg border border-slate-200 p-8 shadow">
          <Button
            variant={"ghost"}
            className="absolute right-2 top-2 rounded-xl border shadow-sm transition"
            onClick={removeAll}
          >
            <Cross2Icon />
          </Button>
          <FileViewer acceptedFile={fileToUpload} />
        </div>
      ) : null}

      {uploadedFiles.length > 0 && (
        <div className="0">
          <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
            Uploaded Files
          </p>
        </div>
      )}
    </div>
  )
}
