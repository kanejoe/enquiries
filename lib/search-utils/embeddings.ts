import { Configuration, OpenAIApi } from "openai-edge"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(config)

export async function getEmbeddings(input: string): Promise<number[]> {
  try {
    // Correct the model name by removing leading/trailing spaces.
    const response = await openai.createEmbedding({
      model: "text-embedding-3-large", // Correct model name
      input: input.replace(/\n/g, " "),
    })

    // Directly use the response assuming it's properly formatted for TypeScript.
    if ("data" in response && response.data.length > 0) {
      return response.data[0].embedding as number[]
    } else {
      throw new Error("No embeddings found in the response.")
    }
  } catch (e) {
    // Improve error handling for TypeScript.
    console.error("Error calling OpenAI embedding API: ", e)
    throw new Error(
      `Error calling OpenAI embedding API: ${e instanceof Error ? e.message : e}`
    )
  }
}
