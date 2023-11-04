import React, { useState } from "react"
import { z } from "zod"

const FormSchema = z.object({
  id: z.number().nullable().optional(),
  query: z.string().transform((str) => str.trim()),
  sequence: z.string().default("1"),
  parent_id: z.number().positive().nullable().optional(),
  is_required: z.boolean().default(true).optional(),
})

const MyFormComponent = () => {
  const [formData, setFormData] = useState({
    id: null,
    query: "",
    sequence: "1",
    parent_id: null,
    is_required: true,
  })

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      // This will validate and also transform the data.
      const validatedData = FormSchema.parse(formData)
      console.log("Validated Data:", validatedData)
      // Handle your form submission with validatedData...
    } catch (error) {
      console.error("Validation Error:", error)
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ...other form fields... */}
      <input
        name="query"
        value={formData.query}
        onChange={handleChange}
        placeholder="Type your query"
      />
      {/* ...other form fields... */}
      <button type="submit">Submit</button>
    </form>
  )
}

export default MyFormComponent
