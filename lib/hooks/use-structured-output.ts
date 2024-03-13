import { useQuery } from "@tanstack/react-query"

import { keys } from "./keys"

const fetchDocumentById = async (document_id: number) => {
  const response = await fetch("/api/structured_output", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ document_id }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch document")
  }

  return response.json()
}

const useStructuredOutput = (document_id: number) => {
  return useQuery({
    queryKey: [keys.getStructuredOutput, document_id],
    queryFn: () => fetchDocumentById(document_id),
    retry: false,
  })
}

export { useStructuredOutput }
