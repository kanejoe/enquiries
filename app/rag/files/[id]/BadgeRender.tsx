import { Badge } from "@/components/ui/badge"

type BadgeRendererProps = {
  text: string
}

const BadgeRenderer: React.FC<BadgeRendererProps> = ({ text }) => {
  // Splitting the text by semicolon and filtering out empty strings
  const items = text.split(";").filter((item) => item.trim())

  return (
    <div>
      {items.map((item, index) => (
        <Badge key={index} variant="secondary" className="m-1">
          {item.trim()}
        </Badge>
      ))}
    </div>
  )
}

export { BadgeRenderer }
