"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { UploadComponent } from "../upload/UploadComponent"

export function UploadButton() {
  const [open, setIsOpen] = useState(false)
  return (
    <>
      <div className="fixed bottom-4 right-6 z-50 flex items-center justify-center">
        <button
          type="button"
          className="hover:bg-hover hover:text-hover rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white shadow-2xl shadow-slate-400 active:translate-y-px"
          onClick={() => setIsOpen(true)}
        >
          {/* Add the icon with some margin */}
          Upload Document
        </button>
      </div>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[925px]">
          <DialogHeader>
            <DialogTitle>Document Upload</DialogTitle>
          </DialogHeader>
          <UploadComponent />
        </DialogContent>
      </Dialog>
    </>
  )
}
