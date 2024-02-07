import { FC, useCallback, useState } from "react"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"
import { AnimatePresence, motion } from "framer-motion"

import { Tables } from "@/lib/database.types"
import { useFetchDocumentWithTagsById } from "@/lib/hooks/useTags"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BadgeRenderer } from "./BadgeRender"
import { CurrentBadge } from "./CurrentBadge"

type TDocumentTagProps = { documentId: Tables<"documents">["id"] }

const DocumentTags: FC<TDocumentTagProps> = ({ documentId }) => {
  const { data: document } = useFetchDocumentWithTagsById(documentId)
  const dtags = document?.tags ?? []

  const [content, setContent] = useState("")
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/tags",
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
          <CardTitle className="text-lg">Document Tags</CardTitle>
          <CardDescription>Categorise the File</CardDescription>
          <Separator className="" />
          <CardContent className="p-0">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-wrap gap-2">
                {Array.isArray(dtags) && dtags.length > 0
                  ? dtags.map((tag) => (
                      <div key={tag.id} className="">
                        <CurrentBadge tag={tag} documentId={documentId} />
                      </div>
                    ))
                  : null}
              </div>
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
                      <BadgeRenderer text={content} />
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
                onClick={() =>
                  document && summariseText(document.id.toString())
                }
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

export { DocumentTags }
