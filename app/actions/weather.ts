"use server"

import { z } from "zod"

// Define the schema for weather data validation
const weatherResponseSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    temp_f: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    wind_kph: z.number(),
    wind_dir: z.string(),
    humidity: z.number(),
    feelslike_c: z.number(),
    feelslike_f: z.number(),
    uv: z.number(),
  }),
  forecast: z
    .object({
      forecastday: z.array(
        z.object({
          date: z.string(),
          day: z.object({
            maxtemp_c: z.number(),
            mintemp_c: z.number(),
            avgtemp_c: z.number(),
            maxtemp_f: z.number(),
            mintemp_f: z.number(),
            avgtemp_f: z.number(),
            condition: z.object({
              text: z.string(),
              icon: z.string(),
              code: z.number(),
            }),
            daily_chance_of_rain: z.number(),
          }),
          hour: z.array(
            z.object({
              time: z.string(),
              temp_c: z.number(),
              temp_f: z.number(),
              condition: z.object({
                text: z.string(),
                icon: z.string(),
                code: z.number(),
              }),
            }),
          ),
        }),
      ),
    })
    .optional(),
})

export type WeatherData = z.infer<typeof weatherResponseSchema>

export async function getWeather(location: string, days = 3) {
  try {
    const apiKey = process.env.WEATHER_API_KEY

    if (!apiKey) {
      throw new Error("Weather API key is not configured")
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`

    const response = await fetch(url, { next: { revalidate: 1800 } }) // Cache for 30 minutes

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to fetch weather data")
    }

    const data = await response.json()

    // Validate the response data
    const validatedData = weatherResponseSchema.parse(data)

    return {
      success: true,
      data: validatedData,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

