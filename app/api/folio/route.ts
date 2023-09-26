import { OpenAIStream, StreamingTextResponse } from "ai"
import { RetrievalQAChain } from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { OpenAI } from "langchain/llms/openai"
import {
  JsonOutputFunctionsParser,
  StructuredOutputParser,
} from "langchain/output_parsers"
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

import { loadAndSplit, vectorizeDocs } from "./utils"

const zodSchema = z.object({
  folios: z
    .array(
      z.object({
        folio_number: z.string().describe("The folio number"),
        folio_county: z.string().describe("Which county the folio is in"),
      })
    )
    .describe("An array of the folio numbers found in the plain copy folio"),
})

const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-0613", temperature: 0 })

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(
      "Get me all the folio numbers and counties from this plain copy folio:"
    ),
    HumanMessagePromptTemplate.fromTemplate("{inputText}"),
  ],
  inputVariables: ["inputText"],
})

export async function POST(req: Request) {
  let docs, vectorStore
  try {
    const formData = await req.formData()
    let folio = formData.get("folio")
    docs = await loadAndSplit(folio)
    vectorStore = await vectorizeDocs(docs)

    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever()

    // Create a chain that uses the OpenAI LLM and HNSWLib vector store.
    const chain = RetrievalQAChain.fromLLM(llm, vectorStoreRetriever)
    const response = await chain.call({
      // query: "What is the folio number and county?",
      // query: "Who is the registered owner of the folio?",
      // query: "List all of the burdens on the folio",
      query: "What is the address of the property recited on the folio?",
    })

    const model = new OpenAI({
      modelName: "gpt-3.5-turbo-0613",
      temperature: 0,
    })

    await OutputParser(model)

    console.log({ response })
    return new Response(JSON.stringify(response))
  } catch (error) {
    console.log("🚀 ~ file: route.ts:40 ~ POST ~ error:", error)
    throw new Error("No folio provided")
  }
}

async function OutputParser(llm: OpenAI) {
  // We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      address: z
        .string()
        .describe("address of the property recited in the folio"),
    })
  )
  const formatInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      "Answer the users question as best as possible.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
  })
  const inputQ = await prompt.format({
    question: "What is the address of the property recited in the folio?",
  })

  const response = await llm.call(inputQ)
  const parsed = await parser.parse(response)
  // console.log("🚀 ~ file: route.ts:93 ~ OutputParser ~ response:", response)
  console.log("🚀 ~ file: route.ts:93 ~ OutputParser ~ response:", parsed)
  return parsed
}
