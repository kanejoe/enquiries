import { NextResponse } from "next/server"

const payload = {
  message_id: "dK6bEyB",
  title:
    "what are the land registry fees for a transfer where the consideration is €350,000 and for a subdivi",
  createdAt: 1709070025769,
  path: "/query/dK6bEyB",
  messages: [
    {
      role: "user",
      content:
        "what are the land registry fees for a transfer where the consideration is €350,000 and for a subdivision and a mortgage.",
    },
    {
      content:
        "For a transfer where the consideration is €350,000, the Land Registry fee would be €700, as it falls within the range of €200,001 to €400,000.\n\nRegistration of part of a folio (Open New Folio) €75\nCharge/Judgment Mortgage €175\n\nFor a subdivision, which involves the registration of part of a folio (opening a new folio), the fee is €75. For the registration of a mortgage, known as a Charge/Judgment Mortgage, the fee is €175.\n\nTherefore, the total Land Registry fees for a transfer with a consideration of €350,000, including the fees for a subdivision and a mortgage, would be:\n\n€700 (transfer) + €75 (subdivision) + €175 (mortgage) = €950.",
      role: "assistant",
    },
  ],
}

export async function GET(request: Request) {
  return NextResponse.json({ payload }, { status: 200 })
}
