// Import required modules
import { type FC } from "react"

// Define the component
const Loading: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-primary"></div>
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  )
}

// Export the component
export default Loading
