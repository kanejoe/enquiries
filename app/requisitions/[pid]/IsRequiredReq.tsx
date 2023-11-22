import { FC } from "react"
import { HeadingIcon, InfoCircledIcon } from "@radix-ui/react-icons"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type IsRequiredIconProps = {
  isRequired: boolean
}

export const IsRequiredIcon: FC<IsRequiredIconProps> = ({ isRequired }) => {
  return isRequired ? null : (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <HeadingIcon className="-mt-0.5 ml-2 inline-block text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs bg-primary">
            <p className="font-semibold text-secondary-foreground">
              <div className="flex space-x-6">
                <div className="min-w-4">
                  <InfoCircledIcon className="mr-1.5 inline-block" />
                </div>
                This indicates a query which cannot be replied to. It may be a
                heading or descriptive only.
              </div>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
