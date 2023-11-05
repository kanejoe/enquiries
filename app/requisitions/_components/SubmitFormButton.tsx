import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Spinner } from "@/components/Spinner"

// const wait = () => new Promise((resolve) => setTimeout(resolve, 500))

export function SubmitFormButton() {
  return (
    <div className="mt-8 space-x-6 text-right">
      <DialogClose asChild className="text-gray-600 hover:text-gray-800">
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button type="submit" className="group-disabled:pointer-events-none">
        <Spinner className="absolute h-4 group-enabled:opacity-0" />
        <span className="group-disabled:opacity-0">Save</span>
      </Button>
    </div>
  )
}
