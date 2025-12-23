export interface WeatherResponse {
    weather: WeatherCondition[]
    main: WeatherMain
    wind: Wind
    name: string
}

export interface WeatherCondition {
    id: number
    main: string
    description: string
    icon: string
}

export interface WeatherMain {
    temp: number
    humidity: number
}

export interface Wind {
    speed: number
}
