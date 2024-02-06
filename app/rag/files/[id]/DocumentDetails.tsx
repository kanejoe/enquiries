import { FC, useCallback, useState } from "react"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { FunctionCallHandler } from "ai"
import { useCompletion } from "ai/react"
import { AnimatePresence, motion } from "framer-motion"

import { Tables } from "@/lib/database.types"
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

interface Props {
  text: string
}
const TextToList: FC<Props> = ({ text }) => {
  // Split the text into lines based on the pattern described
  const lines = text.match(/\(\d+\)[^()]+/g)

  return (
    <ul className="">
      {lines?.map((line, index) => <li key={index}>{`${line}`}</li>)}
    </ul>
  )
}

interface DocumentDetailsProps {
  document: Tables<"documents">
}

const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  if (functionCall.name === "get_current_weather") {
    if (functionCall.arguments) {
      const parsedFunctionCallArguments = JSON.parse(functionCall.arguments)
      // You now have access to the parsed arguments here (assuming the JSON was valid)
      // If JSON is invalid, return an appropriate message to the model so that it may retry?
      console.log(parsedFunctionCallArguments)
    }
  }
}

const DocumentDetails: FC<DocumentDetailsProps> = ({ document }) => {
  const [content, setContent] = useState("")
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/document_details",
    // experimental_onFunctionCall: functionCallHandler,
  })

  const summariseText = useCallback(
    async (c: string) => {
      setContent("")
      const completion = await complete(c)
      if (!completion) throw new Error("Failed to detail the content")
      setContent(completion)
    },
    [complete]
  )

  return (
    <>
      <Card className="w-full font-geistsans shadow">
        <CardHeader>
          <CardTitle className="text-lg">Document Details</CardTitle>
          <CardDescription></CardDescription>
          <Separator className="" />
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
                      <TextToList text={content} />
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

export { DocumentDetails }
