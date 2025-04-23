import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "../actions/weather"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HourlyForecastProps {
  data: WeatherData
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  if (!data.forecast) return null

  // Get today's hourly forecast
  const today = data.forecast.forecastday[0]

  // Filter hours that are in the future
  const currentHour = new Date().getHours()
  const futureHours = today.hour.filter((hour) => {
    const hourTime = new Date(hour.time).getHours()
    return hourTime >= currentHour
  })

  if (futureHours.length === 0) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex space-x-4">
            {futureHours.map((hour) => (
              <div key={hour.time} className="flex flex-col items-center space-y-1 min-w-[80px]">
                <span className="text-sm font-medium">
                  {new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric" })}
                </span>
                <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={40} height={40} />
                <span className="text-sm font-bold">{Math.round(hour.temp_c)}°C</span>
                <span className="text-xs text-muted-foreground truncate max-w-[80px]" title={hour.condition.text}>
                  {hour.condition.text}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

