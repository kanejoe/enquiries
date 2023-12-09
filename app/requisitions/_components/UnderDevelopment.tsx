import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"

export function UnderDevelopment() {
  return (
    <div className="rounded-r-sm border-l-4 border-yellow-400 bg-yellow-50 p-5 ring-1 ring-yellow-600/20">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-amber-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-yellow-800">
            This set is currently under development.
          </p>
        </div>
      </div>
    </div>
  )
}
