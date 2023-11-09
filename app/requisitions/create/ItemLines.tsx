type ItemLinesProps = {
  hasChildren: boolean
  isLastItem: boolean
}

export function ItemLines({ hasChildren, isLastItem }: ItemLinesProps) {
  return (
    <>
      {/* vertical line */}
      {hasChildren ? (
        <div className="absolute -bottom-6 left-[59px] top-5 w-px bg-gray-200 group-focus-within:bg-primary group-hover:bg-primary" />
      ) : isLastItem ? null : (
        <div className="absolute -bottom-8 left-[59px] top-5 w-px bg-gray-200 group-focus-within:bg-primary group-hover:bg-primary" />
      )}
      {/* horizontal line */}
      <div className="absolute -right-6 bottom-2 left-8 top-4 h-px bg-gray-200 group-focus-within:bg-primary group-hover:bg-primary" />
      {/* circle */}
      <div className="absolute left-14 top-[13px]">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300 group-focus-within:bg-primary/25 group-focus-within:ring-primary group-hover:bg-primary/25 group-hover:ring-primary" />
      </div>
    </>
  )
}
