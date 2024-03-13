import { register } from "module"
import { NextRequest, NextResponse } from "next/server"
import { PromptTemplate } from "@langchain/core/prompts"
import { ChatOpenAI } from "@langchain/openai"
import { JsonOutputFunctionsParser } from "langchain/output_parsers"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

import {
  getDocumentContentByDocumentId,
  getDocumentNameById,
} from "@/lib/supabase-funcs/supabase.server"
import { getContextTextWithLimit } from "@/lib/utils"

import { folio_schema } from "./folio-schema"

export const runtime = "edge"

const TEMPLATE = `
    Extract the requested fields from the input.
    Input: {input}
`

/**
 * This handler initializes and calls an OpenAI Functions powered
 * structured output chain. See the docs for more information:
 *
 * https://js.langchain.com/docs/modules/chains/popular/structured_output
 */

export async function POST(req: NextRequest) {
  try {
    const { document_id } = (await req.json()) as {
      document_id: number
    }

    const document_sections = await getDocumentContentByDocumentId(document_id)
    if (!document_sections) {
      throw new Error("No document found")
    }

    const extended_document_sections = await Promise.all(
      document_sections.map(async (doc: any) => {
        return {
          ...doc,
          document_name: await getDocumentNameById(doc.document_id),
        }
      })
    )

    const contextText = getContextTextWithLimit(extended_document_sections)

    const model = new ChatOpenAI({
      temperature: 0.8,
      modelName: "gpt-4-1106-preview",
      // modelName: "gpt-3.5-turbo-1106",
    })

    const prompt = PromptTemplate.fromTemplate(TEMPLATE)
    /**
     * We use Zod (https://zod.dev) to define our schema for convenience,
     * but you can pass JSON Schema directly if desired.
     */

    /**
     * Bind the function and schema to the OpenAI model.
     * Future invocations of the returned model will always use these arguments.
     *
     * Specifying "function_call" ensures that the provided function will always
     * be called by the model.
     */
    const functionCallingModel = model.bind({
      functions: [
        {
          name: "folio_output_formatter",
          description: "Extract the requested fields from a plain copy folio.",
          parameters: zodToJsonSchema(folio_schema),
        },
      ],
      function_call: { name: "folio_output_formatter" },
    })

    const chain = prompt
      .pipe(functionCallingModel)
      .pipe(new JsonOutputFunctionsParser())

    const stream = chain.stream({
      input: contextText,
    })

    const result = await chain.invoke({
      input: contextText,
    })
    // console.log("🚀 ~ POST ~ result:", result)

    return NextResponse.json(result, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
