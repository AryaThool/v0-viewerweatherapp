import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudSun } from "lucide-react"

export function InitialState() {
  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <CloudSun className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>Search for a location to see the current weather and forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Enter a city name, postal code, or coordinates in the search box above to get started.
        </p>
      </CardContent>
    </Card>
  )
}

