import { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ModalComponentProps = {
  title: string | JSX.Element
  description?: string
  children: ReactNode
  footer?: JSX.Element
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ModalComponent = ({
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
}: ModalComponentProps): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-[625px] md:w-3/4 md:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  )
}
