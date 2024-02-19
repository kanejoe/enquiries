import { fetchEmbeddings } from "./embeddings"

export const getContext = async (message: string): Promise<string> => {
  // Get the embeddings of the input message
  const embedding = await fetchEmbeddings(message)

  return embedding.join(" ")
}
