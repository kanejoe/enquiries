import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

import { AtomicReq, useAtomicReqStore } from "./reqStore"

export function CompletedProgress() {
  const requisitions = useAtomicReqStore((state) => state.requisitions)
  const totalReqs = requisitions.filter(
    (req: AtomicReq) => req.level !== 0 && req.isApplicable === true
  )
  const completedReqs = totalReqs.filter(
    (req: AtomicReq) => req.isComplete === true
  )
  const percent = calcPercent(completedReqs.length, totalReqs.length)
  const headingReq = requisitions.find((req: AtomicReq) => req.level === 0)

  return (
    <div
      className={
        (cn("mt-0.5 flex flex-col gap-y-1 transition-opacity delay-200"),
        headingReq?.isApplicable ? "opacity-100" : "opacity-0")
      }
    >
      <div className="text-sm">
        <span className="mr-1 oldstyle-nums">{percent}%</span>
        <span className="">complete</span>
      </div>

      <div className="">
        <Progress value={percent} className="" />
      </div>
    </div>
  )
}

function calcPercent(completed: number, total: number) {
  const res = (completed / total) * 100
  return Math.floor(res)
}
