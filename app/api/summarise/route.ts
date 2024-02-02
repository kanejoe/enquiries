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

  const summaryPrompt = `Summarise the following content, which is published by the Law Society Conveyancing Committee: ${content} in less than 200 words but ideally in 200 words. 
        It should be a professional summary.  You are a professional lawyer giving the summary.  Do not cut off the summary mid-sentence or mid-paragraph.
        The summary should be in your own words.  Do not copy and paste from the original content.  You can use the original content as a reference.  
        If no context has been provided, say this and reply no further.`

  const tagsPrompt = `Using this context: ${content} and the following tags: 
    conveyancing, property, and any other tags which are relevant, give me some tags separated by semi-colons.  
    Remember you are a professional lawyer and the tags should be professional and relevant to the context.   
    If there are references to statutes or laws, these should be included in the tags.
    If no context has been provided, say this and reply no further.`

  const infoPrompt = `Using this context: ${content} give me only (1) the publisher of the content  (2) the date of publication (say no date if not sure), (3) the title of the piece and (4) the author.`

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    // model: "gpt-4-0125-preview",
    model: "gpt-4-1106-preview",
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
