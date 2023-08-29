import Link from "next/link"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export default async function CreateRequisitionPage() {
  return (
    <section className="">
      <Button
        asChild
        className="h-12 w-full px-4 py-2 text-primary-foreground shadow hover:bg-primary/90"
        variant={"default"}
      >
        <Link href="/login">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add New
        </Link>
      </Button>
    </section>
  )
}
