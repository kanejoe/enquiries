import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

type DrawerComponentProps = {
  isOpen: boolean
  isOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  footer?: JSX.Element
}

export function DrawerComponent({
  isOpen,
  isOpenChange,
  title,
  description,
  children,
  footer,
}: DrawerComponentProps) {
  return (
    <Drawer
      open={isOpen}
      onOpenChange={isOpenChange}
      shouldScaleBackground={true}
      direction="right"
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="font-geistsans text-xl text-blue-800">
              {title}
            </DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">{children}</div>
          <DrawerFooter>
            {footer}
            <DrawerClose asChild>
              <div className="flex justify-center">
                <Button variant="outline" className="w-1/2">
                  close out
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
