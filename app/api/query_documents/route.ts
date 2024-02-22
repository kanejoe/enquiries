import { Message, OpenAIStream, StreamingTextResponse } from "ai"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { Configuration, OpenAIApi } from "openai-edge"

import { createServerSupabaseClient } from "@/lib//supabase-funcs/supabase.server"
import { getContext } from "@/lib/utils/context"
import { getEmbeddings } from "@/lib/utils/embeddings"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  // Create a Supabase client
  const supabaseClient = createServerSupabaseClient()
  try {
    const { messages } = (await req.json()) as { messages: Message[] }
    // console.log("🚀 ~ POST ~ messages:", messages)
    const currentMessageContent =
      (messages && messages[messages.length - 1]?.content) || ""

    if (!currentMessageContent) {
      throw new Error("No message content provided")
    }
    console.log("🚀 ~ POST ~ currentMessageContent:", currentMessageContent)
    const query_embedding = await getEmbeddings(currentMessageContent)

    const { data: matchDocuments } = await supabaseClient.rpc(
      "match_documents_cosine",
      {
        query_embedding: query_embedding,
        match_threshold: 0.78,
        match_count: 5,
      }
    )
    console.log("🚀 ~ POST ~ matchDocuments:", matchDocuments)

    const { data: documents } = await supabaseClient.rpc(
      "match_document_sections",
      {
        embedding: query_embedding,
        match_threshold: 0.78, // Choose an appropriate threshold for your data
      }
    )
    console.log("🚀 ~ POST ~ documents:", documents)

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages.map((message: any) => ({
        content: message.content,
        role: message.role,
      })),
    })

    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", e)
    throw e
  }
}
