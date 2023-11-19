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
    <div className="flex h-[calc(100vh-13rem)] flex-col rounded-xl border border-zinc-100 shadow-sm ring-black ring-opacity-5">
      <div className="sticky top-0 z-10 rounded-t-xl border-b border-dotted border-zinc-200 bg-zinc-50">
        <div className="flex h-20 items-center overflow-hidden">
          {headerComponent ? headerComponent : <div className="h-6"></div>}
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 ${
          footerComponent ? "" : "pb-6"
        }`}
      >
        {children}
      </div>

      <div
        className={`sticky bottom-0 z-20 rounded-b-xl bg-white/70 backdrop-blur-md ${
          footerComponent ? "" : "h-4"
        }`}
      >
        {footerComponent ? footerComponent : <div></div>}
      </div>
    </div>
  )
}
