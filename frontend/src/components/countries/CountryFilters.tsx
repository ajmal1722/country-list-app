interface CountryFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    region: string;
    setRegion: (value: string) => void;
    population: string;
    setPopulation: (value: string) => void;
}

const CountryFilters = ({
    search,
    setSearch,
    region,
    setRegion,
    population,
    setPopulation,
}: CountryFiltersProps) => {
    return (
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:gap-6">

            {/* Search */}
            <div className="flex-1">
                <label className="mb-1 block text-xs tracking-wide text-muted">
                    Search
                </label>
                <input
                    type="text"
                    placeholder="Search country"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-b border-tertiary bg-transparent py-2 text-sm tracking-wide text-primary
                     placeholder:text-muted
                     focus:border-primary focus:outline-none"
                />
            </div>

            {/* Region */}
            <div className="w-full md:w-48">
                <label className="mb-1 block text-xs tracking-wide text-muted">
                    Region
                </label>
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full border-b border-tertiary bg-transparent py-2 text-sm tracking-wide text-primary
                     focus:border-primary focus:outline-none"
                >
                    <option value="all" className="dark:bg-base">All Regions</option>
                    <option value="Asia" className="dark:bg-base">Asia</option>
                    <option value="Europe" className="dark:bg-base">Europe</option>
                    <option value="Africa" className="dark:bg-base">Africa</option>
                    <option value="Americas" className="dark:bg-base">Americas</option>
                    <option value="Oceania" className="dark:bg-base">Oceania</option>
                </select>
            </div>

            {/* Population */}
            <div className="w-full md:w-48">
                <label className="mb-1 block text-xs tracking-wide text-muted">
                    Population
                </label>
                <select
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                    className="w-full border-b border-tertiary bg-transparent py-2 text-sm tracking-wide text-primary
                     focus:border-primary focus:outline-none"
                >
                    <option value="all" className="dark:bg-base">All</option>
                    <option value="lt10" className="dark:bg-base">&lt; 10M</option>
                    <option value="10to50" className="dark:bg-base">10M – 50M</option>
                    <option value="gt50" className="dark:bg-base">&gt; 50M</option>
                </select>
            </div>

        </div>
    );
};

export default CountryFilters;