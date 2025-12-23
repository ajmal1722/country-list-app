import { useEffect, useState, useMemo } from "react";
import { getAllCountries } from "../services/countryService";
import type { Country } from "../types/country";
import Loading from "../components/shared/Loading";
import { useDebounce } from "../hooks/useDebounce";

const ITEMS_PER_PAGE = 12

function CountryList() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [region, setRegion] = useState("all")
    const [population, setPopulation] = useState("all");

    const debouncedSearch = useDebounce(search, 500);

    const filteredCountries = useMemo(() => {
        return countries.filter((country) => {
            // Search filter
            const matchesSearch = country.name.common
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())

            // Region filter
            const matchesRegion =
                region === "all" || country.region === region

            // Population filter
            const matchesPopulation =
                population === "all" ||
                (population === "lt10" && country.population < 10_000_000) ||
                (population === "10to50" &&
                    country.population >= 10_000_000 &&
                    country.population <= 50_000_000) ||
                (population === "gt50" && country.population > 50_000_000)

            return matchesSearch && matchesRegion && matchesPopulation
        })
    }, [countries, debouncedSearch, region, population])

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
        return filteredCountries.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredCountries, currentPage])

    const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)

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

            <div style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Search country..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setCurrentPage(1)
                    }}
                />

                <select
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value)
                        setCurrentPage(1)
                    }}
                >
                    <option value="all">All Regions</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Oceania">Oceania</option>
                </select>

                <select
                    value={population}
                    onChange={(e) => {
                        setPopulation(e.target.value)
                        setCurrentPage(1)
                    }}
                >
                    <option value="all">All Population</option>
                    <option value="lt10">&lt; 10M</option>
                    <option value="10to50">10M – 50M</option>
                    <option value="gt50">&gt; 50M</option>
                </select>
            </div>


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