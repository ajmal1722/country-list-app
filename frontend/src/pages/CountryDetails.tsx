import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import { getCountryByName } from "../services/countryService"
import { getWeatherByCity } from "../services/weatherService"
import type { Country } from "../types/country"
import type { WeatherResponse } from "../types/weather"
import CountryInfo from "../components/countries/CountryInfo"
import WeatherWidget from "../components/countries/WeatherWidget"
import Loading from "../components/shared/Loading"

function CountryDetails() {
    const { name } = useParams<{ name: string }>()

    const [country, setCountry] = useState<Country | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<WeatherResponse | null>(null)
    const [weatherLoading, setWeatherLoading] = useState(false)
    const [weatherError, setWeatherError] = useState<string | null>(null)

    useEffect(() => {
        if (!name) return

        let isMounted = true

        const fetchCountry = async () => {
            try {
                setLoading(true)
                const data = await getCountryByName(name);

                if (isMounted) {
                    setCountry(data[0])
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || "Failed to load country details")
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchCountry()

        return () => {
            isMounted = false
        }
    }, [name])

    useEffect(() => {
        if (!country?.capital?.[0]) return

        let isMounted = true

        const fetchWeather = async () => {
            try {
                setWeatherLoading(true)
                const data = await getWeatherByCity(country.capital![0])

                if (isMounted) {
                    setWeather(data)
                }
            } catch (err: any) {
                if (isMounted) {
                    setWeatherError(
                        err.message || "Failed to fetch weather data"
                    )
                }
            } finally {
                if (isMounted) {
                    setWeatherLoading(false)
                }
            }
        }

        fetchWeather()

        return () => {
            isMounted = false
        }
    }, [country])


    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Error</h2>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <Link
                        to="/"
                        className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        )
    }

    if (!country) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-xl text-gray-500">No country data found</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Back link */}
            <div className="mb-10">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                        <FiArrowLeft className="text-lg" />
                    </div>
                    Back to all countries
                </Link>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-base dark:ring-white/10">
                <div className="p-8 sm:p-12">
                    <CountryInfo country={country} />
                    <WeatherWidget
                        weather={weather}
                        loading={weatherLoading}
                        error={weatherError}
                    />
                </div>
            </div>
        </div>
    )
}

export default CountryDetails;