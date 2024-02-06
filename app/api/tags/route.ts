import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

import { getDocumentSectionsByDocumentId, getTags } from "@/lib/supabase.server"

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = (await req.json()) as { prompt: string }

  let content, tags
  try {
    const sections = await getDocumentSectionsByDocumentId(Number(prompt))
    content = sections?.map((section) => section.content).join(" ")

    const tagsData = await getTags()
    tags = tagsData.map((tag) => tag.tag_name).join("; ")
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
  }

  const tagsPrompt = `Using this context: ${content} and taking into account the following tags: 
    ${tags}, only if they are relevant, give me some tags appropriate to the content and separated by semi-colons.  
    Remember you are a professional lawyer and the tags should be professional and relevant to the context.   
    If there are references to statutes or laws, these should be included in the tags.
    If no context has been provided, produce no tags.`

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
        content: tagsPrompt,
      },
    ],
    max_tokens: 800,
    temperature: 0.2, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
