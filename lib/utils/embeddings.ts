import { OpenAIEmbeddings } from "@langchain/openai"
import OpenAI from "openai"

const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
})

// Define the function to fetch embeddings
/**
 * Fetches embeddings for the given content.
 * @param content The input content to fetch embeddings for.
 * @returns A promise that resolves to the embedding response.
 * @throws An error if fetching embeddings fails.
 */
export async function getEmbeddings(content: string): Promise<any> {
  const openai = new OpenAI()

  try {
    // Format the input content
    const formattedContent = content.replace(/\n/g, " ").trim()

    // Fetch the embeddings
    const embeddingResponse = await embeddings.embedQuery(formattedContent)

    // Generate a one-time embedding for the query itself
    // const embeddingResponse = await openai.embeddings.create({
    //   model: "text-embedding-ada-002",
    //   input: formattedContent,
    // })
    // const vector2 = embeddingResponse?.data[0]?.embedding ?? null

    // Return the embedding response
    // You might want to adjust the return based on the actual structure of embeddingResponse
    // return vector2
    return embeddingResponse
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Failed to fetch embeddings:", error)
    throw new Error("Failed to fetch embeddings due to an error.")
  }
}
