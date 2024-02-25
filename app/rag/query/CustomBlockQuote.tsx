import { FC, HTMLAttributes, ReactNode } from "react"

// types for the CustomBlockquote component
type CustomBlockquoteProps = {
  children?: ReactNode
}

const CustomBlockquote = ({ children }: CustomBlockquoteProps) => (
  <blockquote className="mx-6 my-8 border-l-4 border-gray-200 pl-4 font-geistmono italic text-gray-600">
    {children}
  </blockquote>
)

export { CustomBlockquote }
