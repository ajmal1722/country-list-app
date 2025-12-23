import type { Country } from "../../types/country";

interface CountryCardProps {
    country: Country;
}

const formatPopulation = (population?: number) => {
    if (!population) return "—";

    if (population >= 1_000_000) {
        return `${(population / 1_000_000).toFixed(1)}M`;
    }

    if (population >= 1_000) {
        return `${(population / 1_000).toFixed(1)}K`;
    }

    return population.toString();
};

const CountryCard = ({ country }: CountryCardProps) => {
    return (
        <div className="group cursor-pointer">

            {/* Flag */}
            <div className="aspect-[3/2] overflow-hidden bg-secondary">
                <img
                    src={country.flags?.svg || country.flags?.png}
                    alt={country.name.common}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Info */}
            <div className="mt-4 space-y-1">

                {/* Country Name */}
                <h3 className="text-lg font-medium tracking-wide text-primary">
                    {country.name.common}
                </h3>

                {/* Capital */}
                <p className="text-sm text-muted">
                    {country.capital?.[0] ?? "No capital"}
                </p>

                {/* Meta */}
                <div className="pt-1 text-xs tracking-wide text-muted">
                    <span>{country.region}</span>
                    <span className="mx-2">·</span>
                    <span>{formatPopulation(country.population)}</span>
                </div>

            </div>
        </div>
    );
};

export default CountryCard;
