"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons"

// type
import { Requisition } from "@/types/RequisitionType"
// ui

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DialogForm } from "./dialog-form"

interface RequisitionRowActionsProps {
  requisition: Requisition
}

export function RequisitionRowActions({
  requisition,
}: RequisitionRowActionsProps) {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 transition group-hover:bg-primary data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                return e.preventDefault()
              }}
            >
              Edit Requisition
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogForm
              requisition={requisition}
              afterSave={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Add Sibling
          <DropdownMenuShortcut>
            <ArrowRightIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Add Child
          <DropdownMenuShortcut>
            <ArrowDownIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
