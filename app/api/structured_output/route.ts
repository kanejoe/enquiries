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

export const runtime = "edge"

const TEMPLATE = `Extract the requested fields from the input.

                    The field "entity" refers to the first mentioned entity in the input.

                    Input:

                    {input}`

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
    const schema = z.object({
      folio: z.object({
        folio_number: z.string().describe("The folio number of the property"),
        folio_county: z.string().describe("The county of the property"),
      }),
      charges: z
        .array(
          z.object({
            full_details: z.string().describe("full details of the charge"),
            charge_registered_date: z.string().describe("date of the charge"),
            dealing_number: z
              .string()
              .describe(
                "dealing number, which can be in the form LR 2683, or D2003DN022169P for example"
              ),
          })
        )
        .describe(
          "Give a list of the charges on page 3 of the document. Start at 001 or 1 and go to the end.  List the charge number in each case."
        ),
      registered_owner: z
        .array(
          z.object({
            details: z
              .string()
              .describe("name and address of the registered owner(s)"),
          })
        )
        .describe("List the registered owner(s)"),
      property_address: z
        .string()
        .describe(
          "The address of the property. It should be at Part 1(A) - The Property and is a single string."
        ),
    })

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
          name: "output_formatter",
          description: "Should always be used to properly format output",
          parameters: zodToJsonSchema(schema),
        },
      ],
      function_call: { name: "output_formatter" },
    })

    const chain = prompt
      .pipe(functionCallingModel)
      .pipe(new JsonOutputFunctionsParser())

    const result = await chain.invoke({
      input: contextText,
    })

    return NextResponse.json(result, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
