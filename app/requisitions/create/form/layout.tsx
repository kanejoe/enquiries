import { FC } from "react"

interface FormLayoutProps {
  children: React.ReactNode
}

const FormLayoutProps: FC<FormLayoutProps> = ({ children }) => {
  return <section className="">{children}</section>
}

export default FormLayoutProps
