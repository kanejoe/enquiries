import { FC } from "react"

interface CreateReqLayoutProps {
  children: React.ReactNode
}

const CreateRequisitionLayout: FC<CreateReqLayoutProps> = async ({
  children,
}) => {
  return <>{children}</>
}

export default CreateRequisitionLayout
