import * as React from "react"
import { useLayoutEffect } from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleAutoSize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (ref && "current" in ref && ref.current) {
        ref.current.style.height = "auto"
        ref.current.style.height = `${ref.current.scrollHeight}px`
      }
      if (onChange) {
        onChange(event)
      }
    }

    useLayoutEffect(() => {
      handleAutoSize({} as React.ChangeEvent<HTMLTextAreaElement>) // adjust the height when component mounts
    }, [])

    return (
      <textarea
        onChange={handleAutoSize}
        className={cn(
          "flex max-h-[28em] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
