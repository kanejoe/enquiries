"use client"

import { ReactNode } from "react"
import { CopilotProvider } from "@copilotkit/react-core"
import { CopilotSidebarUIProvider } from "@copilotkit/react-ui"

// import "@copilotkit/react-textarea/styles.css" // also import this if you want to use the CopilotTextarea component
// import "@copilotkit/react-ui/styles.css" // also import this if you want to use the chatbot component

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 h-[calc(80vh)]">
      <CopilotProvider chatApiEndpoint="/api/copilotkit/chat">
        <CopilotSidebarUIProvider>{children}</CopilotSidebarUIProvider>
      </CopilotProvider>
    </div>
  )
}
