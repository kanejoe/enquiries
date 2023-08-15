"use client"

// import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  query: z.string(),
  id: z.number(),
})

export function RequisitionForm() {
  let error: object | null | undefined = {}

  async function updateQuery(formData: FormData) {
    // "use server"

    const query = formData.get("query") as string
    console.log(
      "🚀 ~ file: RequisitionForm.tsx:21 ~ updateQuery ~ query:",
      query
    )
    const parsed = formSchema.safeParse(formData)
    if (!parsed.success) {
      // handle error then return
      error = parsed.error.formErrors.fieldErrors
      console.log(
        "🚀 ~ file: RequisitionForm.tsx:31 ~ updateQuery ~ error:",
        error
      )
    } else {
      // do something
      //   result.data
      console.log("success")
    }
  }
  return (
    <form action={updateQuery}>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="query">Query</Label>
        <Textarea
          placeholder="Type your message here."
          id="query"
          name="query"
          className=""
        />
      </div>
      {/* {error && <Label className="text-red-500">{error.query ?? ""}</Label>} */}
      <div className="my-4">
        <Button type="submit" variant="default" size="xs" className="">
          Submit
        </Button>
      </div>
    </form>
  )
}
