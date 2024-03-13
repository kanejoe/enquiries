import { UseChatHelpers } from "ai/react"

import { IconArrowRight } from "@/lib/components/ui/Icons"
import { Button } from "@/components/ui/button"

const exampleMessages = [
  {
    heading: "Ask a question about a lease",
    message: `Give me a draft VAT clause for a commercial lease`,
  },
  {
    heading: "Summarise a practice note",
    message: "Summarise the Law Society Practice Note on lost deeds.",
  },
  {
    heading: "Give details on the a specific contract general condition",
    message: `summarise general condition 32 of the contract for sale.`,
  },
  {
    heading: "Ask a question on PRA fees",
    message: `what are the land registry fees for a transfer where the consideration is €350,000 and with a subdivision, a mortgage/charge and a certified copy folio.`,
  },
  {
    heading: "Voucher query",
    message: `I have a hotel voucher for €100.  I spent €70 in the hotel, but the management are refusing to give me credit of €30.  They say I have to use it all.  Is this legal? Quote the relevant section in the Act/law and give the full title of the Act, if applicable.`,
  },
]

export function ChatEmptyScreen({
  setInput,
}: Pick<UseChatHelpers, "setInput">) {
  return (
    <div className="mx-auto max-w-2xl px-4 font-albertsans">
      <div className="rounded-lg border bg-background p-8 shadow-lg">
        <h1 className="mb-2  text-lg font-semibold">Documents AI Chatbot</h1>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
