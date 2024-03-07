  'use server'

import { render } from 'ai/rsc'
import OpenAI from 'openai'
import { Spinner } from '@/components/Spinner'
import * as z from 'zod'

const openai = new OpenAI()

export async function submitMessage(userInput: string) {

  return render({
    provider: openai,
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an assistant' },
      { role: 'user', content: userInput }
    ],
    text: ({ content }) => {
        console.log("🚀 ~ submitMessage ~ content:", content)
        return (
            <p>{content}</p>
        )
    },
     tools: {
      get_city_weather: {
        description: 'Get the current weather for a city',
        parameters: z.object({
          city: z.string().describe('the city')
        }).required(),
        render: async function* ({ city }) {
          yield <Spinner/>
          const weather = await getWeather(city)
          return <Weather info={weather} />
        }
      }
    }
  })
}