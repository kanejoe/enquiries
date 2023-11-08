"use client"

import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"

import { Requisition } from "@/types/RequisitionType"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/Spinner"

import { deleteRequisition } from "../_actions/deleteRequisition"
import { waitABit } from "./RequisitionDialogForm"

type DeleteRequisitionButtonProps = {
  id: Requisition["id"]
  parent_id: Requisition["parent_id"]
}
export function DeleteRequisitionButton({
  id,
  parent_id,
}: DeleteRequisitionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleDelete(
    id: Requisition["id"],
    parent_id: Requisition["parent_id"]
  ) {
    startTransition(async () => {
      await waitABit(400)
      await deleteRequisition(id, parent_id)
      setIsOpen(false)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          role="button"
          tabIndex={0}
          className="focus-visible:ring-offset mt-0.5 h-4 transition duration-300 group-hover:bg-primary/5 hover:bg-primary/40 focus-visible:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-primary"
        >
          <Trash2 className="h-4 w-4 text-gray-600 hover:text-gray-800" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this Query?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this query? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            onClick={() => handleDelete(id, parent_id)}
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") handleDelete(id, parent_id)
            // }}
          >
            {isPending ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <span>Yes, Delete</span>
            )}
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
