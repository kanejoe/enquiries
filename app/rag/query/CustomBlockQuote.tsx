import { FC, HTMLAttributes, ReactNode } from "react"

// types for the CustomBlockquote component
type CustomBlockquoteProps = {
  children?: ReactNode
}

const CustomBlockquote = ({ children }: CustomBlockquoteProps) => (
  <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600">
    {children}
  </blockquote>
)

export { CustomBlockquote }
