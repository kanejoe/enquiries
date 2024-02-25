import { FC, HTMLAttributes, ReactNode } from "react"

// types for the CustomBlockquote component
type CustomBlockquoteProps = {
  children?: ReactNode
}

const CustomBlockquote = ({ children }: CustomBlockquoteProps) => (
  <blockquote className="mx-2 border-l-4 border-gray-200 pl-2 font-geistmono text-sm italic text-gray-600">
    {children}
  </blockquote>
)

export { CustomBlockquote }
