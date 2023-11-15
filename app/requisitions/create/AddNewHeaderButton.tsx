"use client"

import { useState } from "react"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { HeadingDialogForm } from "./HeadingDialogForm"

interface AddNewHeaderButtonProps {}

/**
 *
 * @param
 * @returns
 */
export const AddNewHeaderButton: React.FC<AddNewHeaderButtonProps> = ({}) => {
  //   const [isOpen, setIsOpen] = useState(false)
  const formData = {
    // id: undefined,
    is_applicable: true,
    level: 1,
    sequence: 3,
    sequence_in_levels: [3],
    query: "",
    siblings: [1, 2, 3],
    parent_id: null,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="contextual font-semibold-caps w-96 text-lg">
          <PlusCircledIcon className="mr-2 h-5 w-5" />
          Add New Heading
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <HeadingDialogForm
          headingData={formData}
          //   afterSave={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
