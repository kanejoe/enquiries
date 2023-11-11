import { ReactElement, ReactNode } from "react"

interface StickyWrapperProps {
  children: ReactNode
  headerComponent?: ReactElement
  footerComponent?: ReactElement
}

export function StickyWrapper({
  footerComponent,
  headerComponent,
  children,
}: StickyWrapperProps) {
  return (
    <div className="shadow-b-sm flex h-[calc(100vh-8rem)] flex-col rounded-xl border border-gray-100">
      <div className="sticky top-0 z-10 rounded-t-xl border-b border-dotted border-gray-200 bg-gray-50">
        <div className="h-20 overflow-hidden truncate ">
          {headerComponent ? headerComponent : <div className="h-6"></div>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
        {children}
      </div>

      {footerComponent ? (
        <div className="sticky bottom-0 z-10">
          <div className="">{footerComponent}</div>
        </div>
      ) : (
        <div className="h-6 "></div>
      )}
    </div>
  )
}
