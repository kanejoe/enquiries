import { FC } from "react"

interface RequisitionFormPageProps {
  searchParams?: { pid?: string }
}

const RequisitionFormPage: FC<RequisitionFormPageProps> = ({
  searchParams,
}) => {
  console.log("🚀 ~ file: page.tsx:8 ~ searchParams:", searchParams)
  return <div>{searchParams?.pid}</div>
}

export default RequisitionFormPage
