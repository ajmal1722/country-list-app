import { createHttpClient } from "./createHttpClient"
import type { WeatherResponse } from "../types/weather"

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY

if (!API_KEY) {
    throw new Error("Missing VITE_OPEN_WEATHER_KEY")
}

const weatherClient = createHttpClient(
    "https://api.openweathermap.org/data/2.5"
)

export const getWeatherByCity = (city: string) => {
    return weatherClient.get<WeatherResponse>("/weather", {
        params: {
            q: city,
            appid: API_KEY,
            units: "metric",
        },
    })
}