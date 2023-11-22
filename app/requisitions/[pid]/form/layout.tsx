import { FC } from "react"

interface FormLayoutProps {
  children: React.ReactNode
}

const FormLayoutProps: FC<FormLayoutProps> = ({ children }) => {
  return <div>{children}</div>
}

export default FormLayoutProps
