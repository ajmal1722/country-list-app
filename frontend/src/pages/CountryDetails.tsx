import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getCountryByName } from "../services/countryService"
import type { Country } from "../types/country"

function CountryDetails() {
    const { name } = useParams<{ name: string }>()
    console.log('name:', name);

    const [country, setCountry] = useState<Country | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!name) return

        let isMounted = true

        const fetchCountry = async () => {
            try {
                setLoading(true)
                const data = await getCountryByName(name);
                console.log('data:', data);

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

    if (loading) {
        return <p>Loading country details...</p>
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    if (!country) {
        return <p>No country data found</p>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Back link */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-gray-700 border rounded-md px-4 py-2 shadow-sm hover:bg-gray-100 transition"
            >
                ← Back to list
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Flag */}
                <div>
                    <img
                        src={country.flags.svg}
                        alt={country.flags.alt || country.name.common}
                        className="w-full max-w-md rounded-lg shadow-md"
                    />
                </div>

                {/* Country info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {country.name.common}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <p>
                            <span className="font-semibold text-gray-700">Official Name:</span>{" "}
                            {country.name.official}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Capital:</span>{" "}
                            {country.capital?.[0] ?? "N/A"}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Region:</span>{" "}
                            {country.region}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Subregion:</span>{" "}
                            {country.subregion ?? "N/A"}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Population:</span>{" "}
                            {country.population.toLocaleString()}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Time Zones:</span>{" "}
                            {country.timezones.join(", ")}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Languages:</span>{" "}
                            {country.languages
                                ? Object.values(country.languages).join(", ")
                                : "N/A"}
                        </p>

                        <p>
                            <span className="font-semibold text-gray-700">Currencies:</span>{" "}
                            {country.currencies
                                ? Object.values(country.currencies)
                                    .map((c) => c.name)
                                    .join(", ")
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CountryDetails;