import { pipeline } from "@xenova/transformers"

export async function embeddingTransformer(text: string) {
  try {
    console.log("transformer initialized")
    const generateEmbeddings = await pipeline(
      "feature-extraction",
      "Supabase/gte-small"
    )
    const response = await generateEmbeddings(text.replace(/\n/g, " "), {
      pooling: "mean",
      normalize: true,
    })

    console.log("getEmb result-=>", response)
    return Array.from(response?.data) as number[]
  } catch (error) {
    console.log("error calling transformer for embeddings ai", error)
    throw error
  }
}
