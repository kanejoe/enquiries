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

  let context
  try {
    const sections = await getDocumentSectionsByDocumentId(Number(prompt))
    context = sections
      ?.map((section) => section.content.replace(/\n/g, " "))
      .join(" ")
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
  }

  // const summaryPrompt =
  //   [
  //   {
  //   role: "system",
  //   `AI assistant is a brand new, powerful, human-like artificial intelligence.
  //     The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
  //     AI is a well-behaved and well-mannered individual.
  //     AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
  //     AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
  //     AI assistant is a a professional lawyer.
  //     START CONTEXT BLOCK
  //     ${context}
  //     END OF CONTEXT BLOCK
  //     AI assistant will provide a professional summary of the content in less than 200 words.
  //     AI assistant will take into account ontly the CONTEXT BLOCK that is provided.
  //     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
  //     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
  //     AI assistant will not invent anything that is not drawn directly from the context.
  //     `
  // },
  // ]

  const summaryPrompt = `
        In less than 200 words, summarize the following content professionally. This is a strict limit, so be consise.
        It should be a professional summary.  You are a professional lawyer giving the summary, but you don't need to state this fact.
        Do not cut off the summary mid-sentence or mid-paragraph.
        The summary should be in your own words.  Do not copy and paste from the original content.  You can use the original content as a reference.
        If no context has been provided, say this and reply no further.
        Don't comment on your instructions, just summarise the content. Remember: less than 200 words.
        START CONTEXT BLOCK
          ${context}
        END OF CONTEXT BLOCK
         AI assistant will take into account ontly the CONTEXT BLOCK that is provided.
         AI assistant will not invent anything that is not drawn directly from the context.
        `

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
