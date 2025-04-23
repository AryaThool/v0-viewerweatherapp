import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "../actions/weather"
import { Droplets, Thermometer, Wind } from "lucide-react"

interface CurrentWeatherProps {
  data: WeatherData
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const { location, current } = data

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{location.name}</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              {location.region}, {location.country}
            </CardDescription>
            <p className="text-sm mt-1">{new Date(location.localtime).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <img
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
                width={64}
                height={64}
                className="mr-2"
              />
              <span className="text-4xl font-bold">{Math.round(current.temp_c)}°C</span>
            </div>
            <p className="text-primary-foreground/90">{current.condition.text}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-2 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-medium">{Math.round(current.feelslike_c)}°C</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-medium">
                {current.wind_kph} km/h ({current.wind_dir})
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Droplets className="h-5 w-5 mr-2 text-blue-400" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{current.humidity}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

