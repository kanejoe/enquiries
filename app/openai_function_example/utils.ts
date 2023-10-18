type LocationData = {
  latitude?: number
  longitude?: number
  [key: string]: any // To allow other properties without TypeScript complaining
}

export async function getLocation(): Promise<LocationData> {
  const response = await fetch("https://ipapi.co/json/")
  const locationData = await response.json()
  return locationData as LocationData
}

type WeatherData = {
  hourly?: {
    apparent_temperature?: number
  }
  [key: string]: any // Again, just to allow other properties
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`
  const response = await fetch(url)
  const weatherData = await response.json()
  return weatherData as WeatherData
}

export const functionDefinitions = [
  {
    name: "getCurrentWeather",
    description: "Get the current weather in a given location",
    parameters: {
      type: "object",
      properties: {
        longitude: {
          type: "string",
        },
        latitude: {
          type: "string",
        },
      },
      required: ["longitude", "latitude"],
    },
  },
  {
    name: "getLocation",
    description: "Get the user's location based on their IP address",
    parameters: {
      type: "object",
      properties: {},
    },
  },
]

export const availableFunctions = {
  getCurrentWeather,
  getLocation,
}
