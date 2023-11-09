"use client"

import { on } from "events"
import { ReactNode, useState } from "react"
import {
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  ThickArrowDownIcon,
  ThickArrowRightIcon,
} from "@radix-ui/react-icons"

// type
import { EnhancedRequisition } from "@/types/RequisitionType"
// utils
import { addChildToParent } from "@/lib/addChildToParent"
import { addSiblingToNode } from "@/lib/addSiblingToNode"
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

import { RequisitionDialogForm } from "./RequisitionDialogForm"

interface RequisitionRowActionsProps {
  requisition: EnhancedRequisition
}

/**
 *
 * @param param0
 * @returns
 */
export function RequisitionRowActions({
  requisition,
}: RequisitionRowActionsProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const newSiblingRequisition = addSiblingToNode(requisition)
  const newChildRequisition = addChildToParent(requisition)

  return (
    <DropdownMenu open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 transition group-focus-within:bg-primary group-hover:bg-primary data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownDialog
          title="Edit Requisition"
          icon={<QuestionMarkCircledIcon />}
          formData={requisition}
          setDialogClose={() => setIsOpenDialog(false)}
        />

        <DropdownMenuSeparator />

        <DropdownDialog
          title="Add Sibling"
          icon={<ThickArrowRightIcon />}
          formData={newSiblingRequisition}
          setDialogClose={() => setIsOpenDialog(false)}
        />

        <DropdownDialog
          title="Add Child"
          icon={<ThickArrowDownIcon />}
          formData={newChildRequisition}
          isDisabled={newChildRequisition.level >= 6}
          setDialogClose={() => setIsOpenDialog(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Type for requisitions where 'id' is optional
type RequisitionWithOptionalId = Omit<EnhancedRequisition, "id"> & {
  id?: number
}

interface DropdownDialogProps {
  title: string
  icon: ReactNode
  formData: RequisitionWithOptionalId
  isDisabled?: boolean
  setDialogClose: () => void
}

function DropdownDialog({
  title,
  icon,
  formData,
  isDisabled = false,
  setDialogClose,
}: DropdownDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
          }}
          disabled={isDisabled}
        >
          {title}
          <DropdownMenuShortcut>{icon}</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <RequisitionDialogForm
          requisition={formData}
          afterSave={() => setIsOpen(false)}
          setDialogClose={setDialogClose}
        />
      </DialogContent>
    </Dialog>
  )
}

function createArray(n: number): number[] {
  const arr: number[] = []
  for (let i = 1; i <= n; i++) {
    arr.push(i)
  }
  return arr
}
