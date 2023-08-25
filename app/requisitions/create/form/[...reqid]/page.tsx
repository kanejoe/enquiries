import { FC } from "react"

interface RequisitionEditFormPageProps {
  params: { reqid: string }
}

const RequisitionFormPage: FC<RequisitionEditFormPageProps> = ({
  params: { reqid },
}) => {
  return <div>RequisitionFormPage Component {reqid} </div>
}

export default RequisitionFormPage
