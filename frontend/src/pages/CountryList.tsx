import { useEffect, useState, useMemo } from "react";
import { getAllCountries } from "../services/countryService";
import type { Country } from "../types/country";
import Loading from "../components/shared/Loading";
import { useDebounce } from "../hooks/useDebounce";
import CountryCard from "../components/countries/CountryCard";
import CountryFilters from "../components/countries/CountryFilters";
import Pagination from "../components/shared/Pagination";

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

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleRegionChange = (value: string) => {
        setRegion(value);
        setCurrentPage(1);
    };

    const handlePopulationChange = (value: string) => {
        setPopulation(value);
        setCurrentPage(1);
    };

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">

            {/* Page Title */}
            <h2 className="mb-8 text-2xl font-semibold tracking-wide text-primary">
                Countries
            </h2>

            <CountryFilters
                search={search}
                setSearch={handleSearchChange}
                region={region}
                setRegion={handleRegionChange}
                population={population}
                setPopulation={handlePopulationChange}
            />

            {/* Content */}
            {paginatedCountries.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                        {paginatedCountries.map((country) => (
                            <CountryCard key={country.name.common} country={country} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 text-4xl">🔍</div>
                    <h3 className="text-xl font-semibold text-primary">No countries found</h3>
                    <p className="mt-2 text-muted">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button
                        onClick={() => {
                            setSearch("");
                            setRegion("all");
                            setPopulation("all");
                        }}
                        className="mt-6 text-sm font-medium text-primary underline hover:opacity-80"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}

export default CountryList;