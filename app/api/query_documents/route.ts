import { Message, OpenAIStream, StreamingTextResponse } from "ai"
import { oneLine, stripIndent } from "common-tags"
import GPT3Tokenizer from "gpt3-tokenizer"
import OpenAI from "openai"

import {
  createServerSupabaseClient,
  insertChatQueries,
} from "@/lib//supabase-funcs/supabase.server"
import { nanoid } from "@/lib/utils"
import { getEmbeddings } from "@/lib/utils/embeddings"

const openai = new OpenAI()

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  // Create a Supabase client
  const supabaseClient = createServerSupabaseClient()
  try {
    const { id, messages } = (await req.json()) as {
      messages: Message[]
      id: string
    }
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
      match_count: 6,
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
        // console.log("🚀 ~ POST ~ tokenCount:", tokenCount)

        // Limit context to max 1500 tokens (configurable)
        if (tokenCount > 16000) {
          break
        }

        contextText += `${content?.trim()}\n---\n`
      }
    }

    const prompt = stripIndent`${oneLine`
      You are a very enthusiastic knowledgeable Irish lawyer who has trained to the highest level in the law in Ireland.
      Quote from the given sections and context where applicable. 
      Only give short quoted text at any one time. Explain the quoted text in your own words.
      Given the following sections from context, answer the question using only that information, outputted in markdown format. 
      Quote Acts or Statute where applicable.
      If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I can't find any information on that."`}

      Context sections:
      ${contextText}

      Question: """
      ${currentMessageContent}
      """

      Answer as markdown (including related quoted text as blockquotes if available):
    `
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0.1,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant with a high level of intelligence. You are a very knowledgeable Irish lawyer who is trained to the highest level in the law.",
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
    })

    // TODO: Make sure that the messages are mapped through correctly

    //   messages: messages.map((message: any) => ({
    //     content: prompt,
    //     role: message.role,
    //   })),

    const stream = OpenAIStream(response, {
      // This callback is called when the completion is ready
      onCompletion: async (completion: string) => {
        try {
          const title = await getGetTitleSummary(messages[0]?.content || "")
          const message_id = id ?? nanoid()
          const path = `/query/${message_id}`

          const payload = {
            message_id,
            title,
            path,
            messages: [
              ...messages,
              {
                content: completion,
                role: "assistant",
              },
            ],
          }

          await insertChatQueries(payload)
        } catch (error) {
          console.log("🚀 ~ POST ~ error:", JSON.stringify(error))
          // throw error
        }
      },
    })
    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", JSON.stringify(e))
    throw e
  }
}

/**
 * Retrieves a summarized title or headline text for the given question.
 *
 * @param question - The text to be summarized.
 * @returns A Promise that resolves to a string representing the summarized title or headline text.
 */
export async function getGetTitleSummary(question: string): Promise<string> {
  const openai = new OpenAI()

  const prompt = stripIndent`
            summarize in 10 words or less the following text:
            ${question}
            so it can be used as a title or headline text.
          `

  try {
    const titleResponse = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant with a high level of intelligence.",
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
    })

    const title =
      titleResponse.choices[0]?.message.content ?? question.substring(0, 100)

    return title
  } catch (error) {
    // Handle the error here
    console.error(error)
    return question.substring(0, 100)
    // throw error
  }
}
