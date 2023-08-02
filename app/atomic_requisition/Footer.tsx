import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { CompletedProgress } from "./CompletedProgress"

/**
 *
 * @returns
 */
export function Footer() {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  return (
    <div className="mt-8 w-full">
      <Separator />
      <div className="mt-4 flex w-full justify-between">
        <div className="flex w-1/5 flex-row gap-x-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-3/5">
          <CompletedProgress />
        </div>
        <div className="w-1/5 text-right text-sm">&copy; {currentYear}</div>
      </div>
    </div>
  )
}
