import { FC } from "react"

interface RequisitionStatsProps {
  totalReqs: number
}

/**
 *
 * @param param0
 * @returns
 */
export const RequisitionStats: FC<RequisitionStatsProps> = ({ totalReqs }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-gray-500">
        Total Queries
      </dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-700">
        {totalReqs}
      </dd>
    </div>
  )
}
