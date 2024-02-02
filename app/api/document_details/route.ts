import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { ChatCompletionCreateParams } from "openai/resources"

import { getDocumentSectionsByDocumentId } from "@/lib/supabase.server"

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// Function definition:
const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: "get_article_details",
    description: "Get Relevant Details from the Article",
    parameters: {
      type: "object",
      properties: {
        committee_name: {
          type: "string",
          description: "The committee name that published the article.",
        },
      },
      required: ["committee_name"],
    },
  },
]

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = (await req.json()) as { prompt: string }

  let content
  try {
    const sections = await getDocumentSectionsByDocumentId(Number(prompt))
    content = sections?.map((section) => section.content).join(" ")
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
  }

  const infoPrompt = `Using this context: ${content} give me only 
        (1) the publisher of the content 
        (2) the date of publication (say no date if not sure), 
        (3) the title of the piece 
        (4) the Committee Name (if known).
        
        The formatting should be:
        (1) Publisher:
        (2) Date:
        (3) Title:
        (4) Committee Name:
        `

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    model: "gpt-4-0125-preview",
    // model: "gpt-4-1106-preview",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: infoPrompt,
      },
    ],
    // functions
    functions,
    max_tokens: 800,
    temperature: 0.1, // you want absolute certainty
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
