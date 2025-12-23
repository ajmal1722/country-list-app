import { useEffect, useState, useMemo } from "react";
import { getAllCountries } from "../services/countryService";
import type { Country } from "../types/country";
import Loading from "../components/shared/Loading";

const ITEMS_PER_PAGE = 10

function CountryList() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        let isMounted = true

        const fetchCountries = async () => {
            try {
                setLoading(true)
                const data = await getAllCountries();
                console.log('data:', data);
                if (isMounted) {
                    setCountries(data)
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || "Failed to fetch countries")
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchCountries()

        return () => {
            isMounted = false
        }
    }, [])

    /**
     * Pagination logic (memoized)
     */
    const paginatedCountries = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        return countries.slice(start, end)
    }, [countries, currentPage])

    const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE)

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">

            {/* Page Title */}
            <h2 className="mb-8 text-2xl font-semibold tracking-wide text-primary">
                Countries
            </h2>

            {/* Country Grid */}
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedCountries.map((country) => (
                    <div
                        key={country.name.common}
                        className="group cursor-pointer"
                    >
                        {/* Flag */}
                        <div className="aspect-3/2 overflow-hidden bg-secondary">
                            <img
                                src={country.flags?.svg || country.flags?.png}
                                alt={country.name.common}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>

                        {/* Info */}
                        <div className="mt-4">
                            <h3 className="text-lg font-medium tracking-wide text-primary">
                                {country.name.common}
                            </h3>

                            <p className="mt-1 text-sm text-muted">
                                {country.capital?.[0] ?? "No capital"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-14 flex items-center justify-center gap-6 text-sm">
                <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                    className="text-muted transition disabled:opacity-40 hover:text-primary"
                >
                    Previous
                </button>

                <span className="tracking-wide text-primary">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                    className="text-muted transition disabled:opacity-40 hover:text-primary"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default CountryList;