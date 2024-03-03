import "server-only"

import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc"
import OpenAI from "openai"
import { z } from "zod"

import { runOpenAICompletion } from "@/lib/utils/run-openai-completion"
import { BotMessage } from "@/components/chat/bot-message"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

async function analyseFolio(content: string) {
  "use server"

  const aiState = getMutableAIState<typeof AI>()

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content,
    },
  ])

  const reply = createStreamableUI(
      <BotMessage className="items-center">{spinner}</BotMessage>,
  )

  const completion = runOpenAICompletion(openai, {
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `\
          You are a lawyer bot and you can help users analyse legal documents, step by step.

          Messages inside [] means that it's a UI element or a user event. 

          If the user requests analyse a folio, call \`analyse folio\` to show the relevant details.
          If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.

          Besides that, you can also chat with users and do some calculations if needed.`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    temperature: 0,
    functions: [
      {
        name: "analyse folio",
        description:
          "Get the registered owner of a folio. Use this to show the registered owner to the user.",
        parameters: z.object({
          owner: z
            .string()
            .describe(
              "The registered owner's name and address. This is the information that will be shown to the user."
            ),
        }),
      },
    ],
  })

  completion.onTextContent((content: string, isFinal: boolean) => {
    // reply.update(<BotMessage>{content}</BotMessage>);
    // if (isFinal) {
    //   reply.done();
    //   aiState.done([...aiState.get(), { role: 'assistant', content }]);
    // }
  });
}

// Define necessary types and create the AI.

const initialAIState: {
  role: "user" | "assistant" | "system" | "function"
  content: string
  id?: string
  name?: string
}[] = []

const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

export const AI = createAI({
  actions: {
    analyseFolio,
  },
  initialUIState,
  initialAIState,
})
