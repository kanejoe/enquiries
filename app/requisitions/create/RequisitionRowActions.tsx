"use client"

import { ReactNode, useState } from "react"
import {
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  ThickArrowDownIcon,
  ThickArrowRightIcon,
} from "@radix-ui/react-icons"

// type
import { EnhancedRequisition } from "@/types/RequisitionType"
import { addSiblingToNode } from "@/lib/addSiblingToNode"
import { addChildToParent } from "@/lib/parentToChild"
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
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const newSiblingRequisition = addSiblingToNode(requisition)
  const newChildRequisition = addChildToParent(requisition)

  return (
    <DropdownMenu open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
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
        />

        <DropdownMenuSeparator />

        <DropdownDialog
          title="Add Sibling"
          icon={<ThickArrowRightIcon />}
          formData={newSiblingRequisition}
        />

        <DropdownDialog
          title="Add Child"
          icon={<ThickArrowDownIcon />}
          formData={newChildRequisition}
          isDisabled={newChildRequisition.level >= 6}
          onDialogClose={() => setDialogIsOpen(false)}
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
  onDialogClose?: () => void
}

function DropdownDialog({
  title,
  icon,
  formData,
  isDisabled = false,
  onDialogClose,
}: DropdownDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
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
          onDialogClose={onDialogClose}
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
