import { FC } from "react"

interface CreateReqLayoutProps {
  children: React.ReactNode
}

const CreateRequisitionLayout: FC<CreateReqLayoutProps> = async ({
  children,
}) => {
  return <main className="font-albertsans">{children}</main>
}

export default CreateRequisitionLayout
