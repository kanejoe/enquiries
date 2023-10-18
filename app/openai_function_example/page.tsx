import { NextPage } from "next"

import { agent } from "./agent"

const Current: NextPage = async () => {
  const query =
    "Please suggest some activities based on my location and the weather. Give the weather in the initial sentence only."
  const response = await agent(query)

  return (
    <div className="font-albertsans">
      <h1 className="mb-4 text-lg font-semibold">Weather Function</h1>
      <a
        className="my-2"
        href="https://cookbook.openai.com/examples/how_to_build_an_agent_with_the_node_sdk"
      >
        https://cookbook.openai.com/examples/how_to_build_an_agent_with_the_node_sdk
      </a>
      <div className="">
        <pre className="flex flex-col space-y-4">
          <code className="whitespace-break-spaces rounded bg-yellow-50 p-2">
            {response}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default Current
