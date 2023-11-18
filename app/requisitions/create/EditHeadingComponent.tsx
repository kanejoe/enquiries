"use client"

import { ReactNode, useState } from "react"
import {
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons"

import { EnhancedRequisition, Requisition } from "@/types/RequisitionType"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { HeadingDialogForm, HeadingFormSchema } from "./HeadingDialogForm"

export function EditHeadingComponent({ node }: { node: EnhancedRequisition }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  return (
    <DropdownMenu open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownDialog
          title="Edit Heading"
          icon={<QuestionMarkCircledIcon />}
          formData={node}
          setDialogClose={() => setIsOpenDialog(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DropdownDialogProps {
  title: string
  icon: ReactNode
  formData: Requisition
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

  let validatedData
  try {
    validatedData = HeadingFormSchema.parse(formData)
  } catch (error) {
    console.error(error)
    return <div>error</div>
  }

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
      <DialogContent className="max-h-[calc(100%-10rem)] max-w-2xl">
        <HeadingDialogForm
          headingData={validatedData}
          setDialogClose={setDialogClose}
        />
      </DialogContent>
    </Dialog>
  )
}
