import { FC } from "react"

import { Requisition } from "@/types/RequisitionType"

interface HeadingScrollAreaProps {
  headers: Requisition[]
}

const HeadingScrollArea: FC<HeadingScrollAreaProps> = ({
  headers,
}: HeadingScrollAreaProps) => {
  console.log("🚀 ~ file: HeadingScrollArea.tsx:12 ~ headers:", headers)
  return <div>HeadingScrollArea Component</div>
}

export { HeadingScrollArea }
