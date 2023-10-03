import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const statuses = [
  {
    value: "In Progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "Completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    icon: CrossCircledIcon,
  },
]

export function StatusBadge({ statusText }: { statusText: string }) {
  const status = statuses.find((status) => {
    return status.value === statusText
  })

  return (
    <div className="flex w-[100px] items-center text-sm text-muted-foreground">
      {status?.icon ? (
        <status.icon className={`mr-2 h-4 w-4 text-teal-800`} />
      ) : null}
      <span>{status?.label}</span>
    </div>
  )
}
