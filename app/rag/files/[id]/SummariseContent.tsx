import { FC, useCallback, useState } from "react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"
import { AnimatePresence, motion } from "framer-motion"
import { GanttChartSquareIcon } from "lucide-react"

import { Tables } from "@/lib/database.types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SummariseContentProps {
  document: Tables<"documents">
}

const SummariseContent: FC<SummariseContentProps> = ({ document }) => {
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

  return (
    <>
      <Card className="w-full font-geistsans shadow">
        <CardHeader>
          <CardTitle className="text-lg">
            <span className="flex">
              <GanttChartSquareIcon className="mr-4 mt-1 h-5 w-5" />
              <span>Summarise the Article</span>
            </span>
          </CardTitle>
          <CardContent className="p-0">
            <div className="flex flex-col gap-y-4">
              <div className="text-pretty text-sm text-muted-foreground">
                <AnimatePresence mode="wait">
                  {content ? (
                    <motion.div
                      key="content1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {content}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {completion}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-1">
            <div className="mt-2">
              <Button
                variant="outline"
                size="xs"
                disabled={isLoading}
                onClick={() => summariseText(document.id.toString())}
              >
                <LightningBoltIcon
                  className={cn(`h-4 w-4`, {
                    "animate-spin fill-yellow-600": isLoading,
                  })}
                />
              </Button>
            </div>
          </CardFooter>
        </CardHeader>
      </Card>
    </>
  )
}

export { SummariseContent }
