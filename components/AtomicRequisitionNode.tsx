import { type AtomicRequisition } from "@/types"

import { transformCharacters } from "@/lib/tree"
import { cn } from "@/lib/utils"

const AtomicRequisitionNode: React.FC<{ node: AtomicRequisition }> = ({
  node,
}) => {
  return (
    <div className="border-box w-full rounded-md border border-transparent opacity-100 transition focus-within:border focus-within:border-slate-200 focus-within:bg-slate-50 dark:focus-within:bg-slate-800">
      <div className="flex flex-col gap-y-4 px-4 pb-4 pt-2 lg:flex-row lg:items-start lg:gap-x-6 lg:gap-y-0 lg:p-4">
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          {node.level && <SectionSpacer level={node.level} />}
          {node.characters && <SectionIndicator characters={node.characters} />}
          {node.query}
        </div>
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          {node.isApplicable ? <div>reply</div> : null}
        </div>
      </div>
    </div>
  )
}

function SectionSpacer({ level }: { level: number }) {
  const spacer_class = cn({
    "hidden lg:block shrink-0": true,
    "lg:w-[2px]": level === 1,
    "lg:w-[8px]": level === 2,
    "lg:w-[16px]": level === 3,
    "lg:w-[24px]": level === 4,
    "lg:w-[32px]": level === 5,
  })
  return <div className={spacer_class}> &nbsp; </div>
}

function SectionIndicator({ characters }: { characters: number[] }) {
  return (
    <div className="shrink-0 lg:mr-6 lg:w-[84px]">
      {transformCharacters(characters)}
    </div>
  )
}

export { AtomicRequisitionNode }
