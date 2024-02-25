import { Message, OpenAIStream, StreamingTextResponse } from "ai"
import { oneLine, stripIndent } from "common-tags"
import GPT3Tokenizer from "gpt3-tokenizer"
import { Configuration, OpenAIApi } from "openai-edge"

import { createServerSupabaseClient } from "@/lib//supabase-funcs/supabase.server"
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
    const query_embedding = await getEmbeddings(currentMessageContent)

    const { data: documents } = await supabaseClient.rpc("match_documents", {
      query_embedding: query_embedding,
      // match_threshold: 0.78, // Choose an appropriate threshold for your data - 78 percent is a good starting point
      match_threshold: 0.02,
      match_count: 5,
    })
    if (!documents) {
      throw new Error("No documents found")
    }

    // console.log(
    //   "🚀 ~ POST ~ documents:",
    //   documents?.map((doc: any) => {
    //     return {
    //       id: doc.id,
    //       similarity: doc.similarity,
    //       document_id: doc.document_id,
    //     }
    //   })
    // )

    const tokenizer = new GPT3Tokenizer({ type: "gpt3" })
    let tokenCount = 0
    let contextText = ""

    // Concat matched documents
    if (documents) {
      for (let i = 0; i < documents.length; i++) {
        const document = documents[i]
        const content = document?.content ?? ""
        const encoded = tokenizer.encode(content)
        tokenCount += encoded.text.length

        // Limit context to max 1500 tokens (configurable)
        if (tokenCount > 16000) {
          break
        }

        contextText += `${content?.trim()}\n---\n`
      }
    }

    const prompt = stripIndent`${oneLine`
      You are a very enthusiastic knowledgeable Irish lawyer who has trained to the highest level in the law and in Ireland.
      Quote from the given sections where applicable. 
      Only give short quoted text at any one time. Explain the quoted text in your own words.
      Given the following sections from context, answer the question using only that information, outputted in markdown format. 
      If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."`}

      Context sections:
      ${contextText}

      Question: """
      ${currentMessageContent}
      """

      Answer as markdown (including related quoted text as code if available):
    `

    const response = await openai.createChatCompletion({
      // model: "gpt-3.5-turbo",
      model: "gpt-4",
      // model: "gpt-3.5-turbo-1106",
      stream: true,
      messages: messages.map((message: any) => ({
        content: prompt,
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
