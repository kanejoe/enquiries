import { type FC, type ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}

const PropertiesLayout: FC<LayoutProps> = ({ children }) => (
  <div className="container mx-auto p-4 font-albertsans">{children}</div>
)

export default PropertiesLayout
