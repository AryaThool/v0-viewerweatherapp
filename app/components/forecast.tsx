import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "../actions/weather"
import { CloudRain } from "lucide-react"

interface ForecastProps {
  data: WeatherData
}

export function Forecast({ data }: ForecastProps) {
  if (!data.forecast) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.forecast.forecastday.map((day) => (
            <Card key={day.date} className="overflow-hidden">
              <CardHeader className="p-4 bg-muted">
                <CardTitle className="text-base">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={40} height={40} />
                    <span className="ml-2 text-sm">{day.day.condition.text}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">
                      {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                    </p>
                  </div>
                  <div className="flex items-center">
                    <CloudRain className="h-4 w-4 mr-1 text-blue-400" />
                    <span className="text-sm">{day.day.daily_chance_of_rain}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

