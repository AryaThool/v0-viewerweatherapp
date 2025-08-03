"use client"

import { useState } from "react"
import { getWeather, type WeatherData } from "./actions/weather"
import { SearchForm } from "./components/search-form"
import { CurrentWeather } from "./components/current-weather"
import { Forecast } from "./components/forecast"
import { HourlyForecast } from "./components/hourly-forecast"
import { ErrorMessage } from "./components/error-message"
import { InitialState } from "./components/initial-state"
import ThemeToggle from "./components/ThemeToggle"

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (location: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await getWeather(location)

      if (result.success && result.data) {
        setWeatherData(result.data)
      } else {
        setError(result.error || "Failed to fetch weather data")
        setWeatherData(null)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setWeatherData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-bold text-center">Weather App</h1>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {error && <ErrorMessage message={error} />}

        <div className="w-full max-w-4xl space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : weatherData ? (
            <>
              <CurrentWeather data={weatherData} />
              <HourlyForecast data={weatherData} />
              <Forecast data={weatherData} />
            </>
          ) : (
            <InitialState />
          )}
        </div>
        <ThemeToggle/>
      </div>

     
    </main>
  )
}

