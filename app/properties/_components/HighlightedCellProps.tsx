interface HighlightedTableCellProps {
  dataString: string
  highlight: string
}

export const HighlightedTableCell: React.FC<HighlightedTableCellProps> = ({
  dataString,
  highlight,
}) => {
  const parts = dataString.split(new RegExp(`(${highlight})`, "gi"))

  return (
    <>
      {parts.map((part, index) => (
        <span
          key={index}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? "bg-yellow-100"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </>
  )
}
