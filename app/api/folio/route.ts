import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

// import { Configuration, OpenAIApi, type ResponseTypes } from "openai-edge"

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

// const configuration = new Configuration({
//   apiKey: "YOUR-API-KEY",
// })
// const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  //   console.log("🚀 ~ file: route.ts:11 ~ POST ~ req:", req.body)
  //   const formData = await req.formData()
  //   const folio = formData.get("folio")
  //   console.log("🚀 ~ file: route.ts:14 ~ POST ~ folio:", folio)
  //   const prompt = "Property Law Business using AI and IoT"

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt: "give me 800 words on the history of the Irish Civil War",
    // prompt: `Create three slogans for a business with unique features.

    //         Business: Bookstore with cats
    //         Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
    //         Business: Gym with rock climbing
    //         Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
    //         Business: ${prompt}
    //         Slogans:`,
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
