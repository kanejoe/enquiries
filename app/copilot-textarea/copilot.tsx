"use client"

// Path: app/copilot-textarea/page.tsx
import React, { useState } from "react"
import { CopilotTextarea } from "@copilotkit/react-textarea"

export const CopilotTextareaComponent: React.FC = () => {
  const [text, setText] = useState("")

  return (
    <div className="container mt-8">
      <CopilotTextarea
        className="px-4 py-4"
        value={text}
        onValueChange={(value: string) => setText(value)}
        placeholder="What are your plans for your vacation?"
        autosuggestionsConfig={{
          textareaPurpose:
            "Travel notes from the user's previous vacations. Likely written in a colloquial style, but adjust as needed.",
          chatApiConfigs: {
            suggestionsApiConfig: {
              forwardedParams: {
                max_tokens: 20,
                stop: [".", "?", "!"],
              },
            },
          },
        }}
      />
    </div>
  )
}


