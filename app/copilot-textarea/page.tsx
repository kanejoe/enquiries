// Path: app/copilot-textarea/page.tsx
import type { Metadata } from "next"

import { CopilotTextareaComponent } from "./copilot"

export const metadata: Metadata = {
  title: "Copilot",
  //   description: "...",
}

const TextAreaForm: React.FC = () => {
  return (
    <div className="container">
      <CopilotTextareaComponent />
    </div>
  )
}

export default TextAreaForm
