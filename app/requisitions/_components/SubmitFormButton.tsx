import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Spinner } from "@/components/Spinner"

// const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

export function SubmitFormButton({
  setDialogClose,
}: {
  setDialogClose?: () => void
}) {
  return (
    <div className="mt-8 space-x-4 text-right">
      <Button
        type="submit"
        className="min-w-[8em] group-disabled:pointer-events-none"
      >
        <Spinner className="absolute h-4 group-enabled:opacity-0" />
        <span className="group-disabled:opacity-0">Save</span>
      </Button>
      <DialogClose
        asChild
        className="text-gray-600 hover:text-gray-800"
        onClick={(e) => {
          // if (setDialogClose !== undefined) setDialogClose()
          // return false
        }}
      >
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
    </div>
  )
}
