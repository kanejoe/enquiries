import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react"
// @ts-expect-error
import { useFormStatus } from "react-dom"

import { Textarea } from "@/components/ui/textarea"

interface ResizableTextareaProps {
  field: any
  placeholder?: string
  className?: string
}

const ResizableTextarea = forwardRef((props: ResizableTextareaProps, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  let { pending } = useFormStatus()

  useImperativeHandle(ref, () => ({
    get textarea() {
      return textareaRef.current
    },
  }))

  const adjustHeight = () => {
    if (textareaRef.current !== null) {
      textareaRef.current.style.height = "inherit" // reset the height
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 6
      }px` // then set it to scrollHeight plus a bit to disappear the scrollbar
    }
  }

  useLayoutEffect(() => {
    adjustHeight() // adjust the height when component mounts
  }, [])

  useLayoutEffect(() => {
    const textareaNode = textareaRef.current
    const handleInput = (e: any) => {
      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + "px"
    }
    textareaNode?.addEventListener("input", handleInput)
    return () => textareaNode?.removeEventListener("input", handleInput)
  }, [])

  return (
    <Textarea
      {...props.field}
      placeholder={props.placeholder}
      className={props.className}
      ref={textareaRef}
      disabled={pending}
    />
  )
})

export { ResizableTextarea }
