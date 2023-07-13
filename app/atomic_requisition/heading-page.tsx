import { headings } from "./data"
import { AtomicRequisition, columns } from "./headings-column"
import { DataTable } from "./headings-table"

export function ReqHeadingDataTable() {
  return (
    <div className="">
      <DataTable columns={columns} data={headings} />
    </div>
  )
}
