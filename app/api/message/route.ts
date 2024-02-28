import { NextResponse } from "next/server"
import { oneLine, stripIndent } from "common-tags"
import OpenAI from "openai"

import { insertChatQueries } from "@/lib/supabase-funcs/supabase.server"

const openai = new OpenAI()

const payload = {
  message_id: "dK6bEyB",
  title:
    "what are the land registry fees for a transfer where the consideration is €350,000 and for a subdivi",
  path: "/query/dK6bEyB",
  messages: [
    {
      role: "user",
      content:
        "what is the land registry fee for a transfer where the consideration is €350,000 and for a subdivision and a mortgage.",
    },
    {
      content:
        "For a transfer where the consideration is €350,000, the Land Registry fee would be €700, as it falls within the range of €200,001 to €400,000.\n\nRegistration of part of a folio (Open New Folio) €75\nCharge/Judgment Mortgage €175\n\nFor a subdivision, which involves the registration of part of a folio (opening a new folio), the fee is €75. For the registration of a mortgage, known as a Charge/Judgment Mortgage, the fee is €175.\n\nTherefore, the total Land Registry fees for a transfer with a consideration of €350,000, including the fees for a subdivision and a mortgage, would be:\n\n€700 (transfer) + €75 (subdivision) + €175 (mortgage) = €950.",
      role: "assistant",
    },
  ],
}

export async function GET(request: Request) {
  // await insertChatQueries(payload)
  const question =
    "what are the land registry fees for a transfer where the consideration is €350,000 and for a subdivision and a mortgage."
  const prompt = stripIndent`
            summarize in 15 words or less the following text:
            ${question}
            so it can be used as a title or headline text.
          `

  const titleResponse = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant with a high level of intelligence.",
      },
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
  })

  const title = titleResponse.choices[0]?.message.content

  return NextResponse.json({ title }, { status: 200 })
}
