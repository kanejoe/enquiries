import OpenAI from "openai"

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
    const formattedContent = content
      .replace(/\n/g, " ")
      // .replace(/+s/g, " ")
      .trim()

    // Fetch the embeddings
    // const embeddingResponse = await embeddings.embedQuery(formattedContent)

    // Generate a one-time embedding for the query itself
    const {
      data: [{ embedding }],
    } = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: formattedContent,
      // dimensions: 1536,
    })

    // Return the embedding response
    // You might want to adjust the return based on the actual structure of embeddingResponse
    // return vector2
    return embedding
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Failed to fetch embeddings:", error)
    throw new Error("Failed to fetch embeddings due to an error.")
  }
}
