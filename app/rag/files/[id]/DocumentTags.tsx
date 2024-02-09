import { FC, useCallback, useState } from "react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"
import { AnimatePresence, motion } from "framer-motion"
import { TagsIcon } from "lucide-react"

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
  const [content, setContent] = useState("")
  const { complete, completion, setCompletion, isLoading } = useCompletion({
    api: "/api/tags",
  })
  const curtags = document?.tags ?? []
  const haveCurrentTags = Array.isArray(curtags) && curtags.length > 0

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
        <CardHeader className="pb-2">
          <CardTitle className="flex text-lg">
            <TagsIcon className="mr-4 mt-px size-6" />
            <span className="">Document Tags</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <CardDescription className="mb-3">
            {haveCurrentTags
              ? "Current Tags Applied"
              : "This document has not yet been tagged. Click to have AI generate tags."}
          </CardDescription>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-wrap gap-2">
              {haveCurrentTags
                ? curtags.map((tag) => (
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
                    <CardDescription className="mb-4">
                      AI Generated Tags
                    </CardDescription>
                    <BadgeRenderer
                      text={content}
                      documentId={documentId}
                      currentTags={curtags}
                    />
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
        <CardFooter className="">
          <div className="flex gap-x-2">
            <Button
              variant="outline"
              size="xs"
              disabled={isLoading}
              onClick={() => document && summariseText(document.id.toString())}
              className="hover:text-white-100 w-full shrink-0 bg-emerald-600 text-white hover:bg-emerald-500"
            >
              Ask AI to Generate Tags
              <LightningBoltIcon
                className={cn(`ml-2 h-4 w-4`, {
                  "animate-spin": isLoading,
                })}
              />
            </Button>
            {content ? (
              <Button
                variant="outline"
                size="xs"
                disabled={isLoading}
                onClick={() => {
                  setContent("")
                  setCompletion("")
                }}
                className="shrink-0"
              >
                Clear
              </Button>
            ) : null}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export { DocumentTags }
