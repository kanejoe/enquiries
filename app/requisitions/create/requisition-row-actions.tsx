"use client"

import { ReactNode, useState } from "react"
import {
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  ThickArrowDownIcon,
  ThickArrowRightIcon,
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

import { DialogForm } from "./DialogForm"

interface RequisitionRowActionsProps {
  requisition: Requisition
}

/**
 *
 * @param param0
 * @returns
 */
export function RequisitionRowActions({
  requisition,
}: RequisitionRowActionsProps) {
  const newSiblingRequisition = Object.assign(
    {},
    {
      is_required: true,
      level: requisition.level,
      query: "",
      parent_id: requisition.parent_id,
      sequence: requisition.sequence + 1,
      sequence_in_levels: [...requisition.sequence_in_levels],
      siblings: [...requisition.siblings, requisition.siblings.length + 1],
    }
  )

  const newChildRequisition = Object.assign(
    {},
    {
      is_required: true,
      level: requisition.level != null ? requisition.level + 1 : 1,
      parent_id: requisition.id,
      query: "",
      sequence: (requisition.children?.length ?? 0) + 1,
      sequence_in_levels: [
        ...requisition.sequence_in_levels,
        (requisition.children?.length ?? 0) + 1,
      ],
      siblings: createArray((requisition.children?.length ?? 0) + 1),
    }
  )

  return (
    <DropdownMenu>
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
        />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={requisition.children && requisition.children?.length > 0}
          onClick={() => {
            console.log("delete")
          }}
        >
          <span title="Cannot delete if requisition has children">Delete</span>
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DropdownDialogProps {
  title: string
  icon: ReactNode
  formData: Requisition
  isDisabled?: boolean
}

function DropdownDialog({
  title,
  icon,
  formData,
  isDisabled = false,
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
        <DialogForm requisition={formData} afterSave={() => setIsOpen(false)} />
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
