import { IconOpenAI } from "@/lib/components/ui/Icons"
import { cn } from "@/lib/utils"

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm",
          !showAvatar && "invisible"
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 px-1">{children}</div>
    </div>
  )
}
