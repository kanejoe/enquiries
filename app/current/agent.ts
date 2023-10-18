import OpenAI from "openai"

import { availableFunctions, functionDefinitions } from "./utils"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

let messages = [
  {
    role: "system",
    content:
      "You are a helpful assistant. Only use the functions you have been provided with.",
  },
]

export async function agent(userInput: string) {
  messages.push({
    role: "user",
    content: userInput,
  })

  for (let i = 0; i < 5; i++) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      // model: "gpt-3.5-turbo-16k",
      // @ts-ignore
      messages: messages,
      functions: functionDefinitions,
      stream: false,
    })

    const choice = response.choices[0]
    const finish_reason = choice?.finish_reason
    const message = choice?.message ?? ""

    if (finish_reason === "function_call" && message && message.function_call) {
      const functionName = message.function_call.name
      // @ts-ignore
      const functionToCall = availableFunctions[functionName]
      const functionArgs = JSON.parse(
        message.function_call.arguments
      ) as Record<string, unknown>
      const functionArgsArr = Object.values(functionArgs)
      const functionResponse = await functionToCall.apply(null, functionArgsArr)

      messages.push({
        role: "function",
        // @ts-ignore
        name: functionName,
        content: `
                The result of the last function was this: ${JSON.stringify(
                  functionResponse
                )}
                `,
      })
    } else if (finish_reason === "stop") {
      if (typeof message === "string") {
        messages.push({
          role: "system",
          content: message,
        })
        return message
      } else {
        messages.push({
          role: message.role || "",
          content: message.content || "",
        })
        return message.content || ""
      }
    }
  }
  return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input."
}
