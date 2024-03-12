"use client"

import { useState } from "react"
import { CloudArrowUpIcon } from "@heroicons/react/20/solid"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { UploadComponent } from "./upload-index"

export function UploadButton() {
  const [open, setIsOpen] = useState(false)
  return (
    <>
      <div className="fixed bottom-4 right-6 z-50 flex items-center justify-center">
        <button
          type="button"
          className="hover:bg-hover hover:text-hover rounded-full bg-primary px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-300 active:translate-y-px"
          onClick={() => setIsOpen(true)}
        >
          <CloudArrowUpIcon className="size-5" />
        </button>
      </div>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className="min-h-[280px] sm:max-w-[925px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Upload a Document
            </DialogTitle>
          </DialogHeader>
          <UploadComponent />
        </DialogContent>
      </Dialog>
    </>
  )
}
