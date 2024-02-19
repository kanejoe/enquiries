import { OpenAIEmbeddings } from "@langchain/openai"

const embeddings = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
})

// Define the function to fetch embeddings
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

// Example usage (uncomment and adjust according to your environment and needs)
// (async () => {
//   const content = "Your text here";
//   try {
//     const embeddings = await fetchEmbeddings(content);
//     console.log(embeddings);
//   } catch (error) {
//     console.error(error);
//   }
// })();
