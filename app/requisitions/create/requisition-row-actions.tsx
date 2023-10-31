"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import * as z from "zod"

// type
import { Requisition } from "@/types/RequisitionType"
// ui
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

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
                console.log("edit requisition", requisition.query)
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

const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

const FormSchema = z.object({
  query: z.string().min(3, {
    message: "Query must be at least 3 characters.",
  }),
})

/**
 *
 * @param param0
 * @returns
 */
function DialogForm({
  requisition,
  afterSave,
}: {
  requisition: Requisition
  afterSave: () => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const adjustHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "inherit" // reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // then set it to scrollHeight
    }
  }

  useLayoutEffect(() => {
    adjustHeight() // adjust the height when component mounts
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: requisition.query || "",
    },
  })
  return (
    <div className="p-4">
      <DialogTitle>Edit Requisition</DialogTitle>
      <Form {...form}>
        <form
          className="my-4 space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            wait().then(() => afterSave())
          }}
        >
          {/** some inputs */}

          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requisition</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the Requisition Query"
                    className="max-h-128 flex-1 pr-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500 dark:text-slate-900 dark:placeholder:text-slate-500"
                    {...field}
                    ref={textareaRef}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
