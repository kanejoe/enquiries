import { useCallback, useState } from "react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"
import { GanttChartSquareIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { ModalComponent } from "@/lib/components/ui/Modal"
import { TDocuments } from "@/lib/types/TableTypes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type SummarizeModalProps = {
  documentId: TDocuments["id"]
}

const SummarizeModal = ({ documentId }: SummarizeModalProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [content, setContent] = useState("")
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/summarise",
  })

  const summariseText = useCallback(
    async (c: string) => {
      setContent("")
      const completion = await complete(c)
      if (!completion) throw new Error("Failed to summarise content")
      setContent(completion)
    },
    [complete]
  )

  const title = () => {
    return (
      <div className="text-lg">
        <span className="flex">
          <GanttChartSquareIcon className="mr-4 mt-1 h-5 w-5" />
          <span>Document Summary</span>
        </span>
      </div>
    )
  }

  return (
    <>
      <Button
        variant={"ghost"}
        size={"xs"}
        className="mx-0 -mt-1"
        onClick={() => setOpen(true)}
      >
        <GanttChartSquareIcon className="mx-1 size-4" />
      </Button>

      <ModalComponent open={open} onOpenChange={setOpen} title={title()}>
        <div className="">
          <div className="text-pretty font-albertsans text-sm [&>*]:px-4 [&>ul>li]:my-4 [&>ul]:list-disc">
            {content ? <ReactMarkdown>{content}</ReactMarkdown> : completion}
          </div>
        </div>

        <div className="p-1">
          <div className="mt-2">
            <Button
              variant="outline"
              size="xs"
              disabled={isLoading}
              onClick={() => summariseText(documentId.toString())}
            >
              <LightningBoltIcon
                className={cn(`size-4`, {
                  "animate-spin fill-yellow-600": isLoading,
                })}
              />
            </Button>
          </div>
        </div>
      </ModalComponent>
    </>
  )
}

export { SummarizeModal }
