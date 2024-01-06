// import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts"
import { StringOutputParser } from "https://esm.sh/@langchain/core@0.1.8/output_parsers"
import { ChatPromptTemplate } from "https://esm.sh/@langchain/core@0.1.8/prompts"
import { ChatOpenAI } from "npm:@langchain/openai"

// import { TextLoader } from "npm:langchain/document_loaders/fs/text"

// import { ChatOpenAI } from "https://esm.sh/@langchain/openai@0.0.9"

Deno.serve(async (req) => {
  const { _input } = await req.json()

  const prompt = ChatPromptTemplate.fromMessages([
    ["human", "Tell me a really funny joke about {topic}"],
  ])
  const model = new ChatOpenAI({})
  const outputParser = new StringOutputParser()

  const chain = prompt.pipe(model).pipe(outputParser)

  const response = await chain.invoke({
    topic: "twins",
  })
  console.log(response)
  /**
Why did the ice cream go to the gym?
Because it wanted to get a little "cone"ditioning!
 */
  return new Response(response, {
    headers: { "Content-Type": "text/plain" },
  })
})
