import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { getDocumentSectionsByDocumentId } from "@/lib/supabase.server"

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

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

  const summaryPrompt = `
        In less than 200 words, summarize the following content professionally: ${content}. This is a strict limit, so be consise.
        It should be a professional summary.  You are a professional lawyer giving the summary.  
        Do not cut off the summary mid-sentence or mid-paragraph.
        The summary should be in your own words.  Do not copy and paste from the original content.  You can use the original content as a reference.  
        If no context has been provided, say this and reply no further.
        Don't comment on your instructions, just summarise the content. Remember: less than 200 words.`

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    // model: "gpt-4-0125-preview",
    model: "gpt-4-1106-preview",
    // model: "llama",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "user",
        content: summaryPrompt,
      },
    ],
    max_tokens: 200,
    temperature: 0.5, // you want absolute certainty
    top_p: 1,
    frequency_penalty: 0.1,
    presence_penalty: 0.0,
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
