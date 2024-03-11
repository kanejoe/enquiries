import Anthropic from "@anthropic-ai/sdk"
import { AnthropicStream, Message, StreamingTextResponse } from "ai"

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
})
// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  try {
    const { messages } = (await req.json()) as any

    const response = await anthropic.messages.create({
      max_tokens: 1024,
      messages,
      model: "claude-3-opus-20240229",
      stream: true,
    })

    // Convert the response into a friendly text-stream
    const stream = AnthropicStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error fetching data:", error)
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
