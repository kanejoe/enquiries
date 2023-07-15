import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <div className="mt-8 w-full">
      <Separator />
      <div className="mt-2 flex justify-between">
        <div className="flex flex-row gap-x-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm">&copy; 2023</div>
      </div>
    </div>
  )
}
