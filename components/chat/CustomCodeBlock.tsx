import { FC, HTMLAttributes, ReactNode } from "react"

// types for the CustomCodeBlock component
interface CustomCodeBlockProps extends HTMLAttributes<HTMLElement> {
  node?: any
  className?: string
  children?: ReactNode
}

const CustomCodeBlock = ({
  node,
  className,
  children,
  ...rest
}: CustomCodeBlockProps) => {
  return (
    <pre
      className={`my-4 overflow-x-auto rounded-lg p-8 ${className}`}
      style={{
        backgroundColor: "#2d2d2d",
        whiteSpace: "pre-wrap",
      }}
    >
      <code
        className={`block px-6 font-geistmono text-sm text-white`}
        {...rest}
      >
        {children}
      </code>
    </pre>
  )
}

export { CustomCodeBlock }
