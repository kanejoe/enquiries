import { OpenAIEmbeddings } from "@langchain/openai"

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
export async function fetchEmbeddings(content: string): Promise<any> {
  try {
    // Format the input content
    const formattedContent = content.replace(/\n/g, " ").trim()

    // Fetch the embeddings
    const embeddingResponse = await embeddings.embedQuery(formattedContent)

    // Return the embedding response
    // You might want to adjust the return based on the actual structure of embeddingResponse
    return embeddingResponse
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Failed to fetch embeddings:", error)
    throw new Error("Failed to fetch embeddings due to an error.")
  }
}
