import { getEmbeddings } from "./embeddings"

export const getContext = async (message: string): Promise<string> => {
  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message)

  return embedding.join(" ")
}
