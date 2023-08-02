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

  return (
    <div className="mt-0.5 flex flex-col gap-y-1">
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
