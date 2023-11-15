"use client"

import { useState } from "react"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { EnhancedRequisition } from "@/types/RequisitionType"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { HeadingDialogForm, HeadingFormSchema } from "./HeadingDialogForm"

interface AddNewHeaderButtonProps {
  newNodeData: Omit<EnhancedRequisition, "id">
}

/**
 *
 * @param
 * @returns
 */
export const AddNewHeaderButton: React.FC<AddNewHeaderButtonProps> = ({
  newNodeData,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  let validatedData
  try {
    validatedData = HeadingFormSchema.parse(newNodeData)
  } catch (error) {
    console.error(error)
    return <div>error</div>
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="contextual font-semibold-caps text-lg xl:w-96">
          <PlusCircledIcon className="mr-2 h-5 w-5" />
          Add New Heading
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <HeadingDialogForm
          headingData={validatedData}
          afterSave={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
