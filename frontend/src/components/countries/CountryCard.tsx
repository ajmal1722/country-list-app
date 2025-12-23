import { useNavigate } from "react-router-dom";
import { FiMapPin, FiUsers, FiHome } from "react-icons/fi";
import type { Country } from "../../types/country";

interface CountryCardProps {
    country: Country;
}

const formatPopulation = (population?: number) => {
    if (!population) return "—";
    if (population >= 1_000_000) return `${(population / 1_000_000).toFixed(1)}M`;
    if (population >= 1_000) return `${(population / 1_000).toFixed(1)}K`;
    return population.toString();
};

const CountryCard = ({ country }: CountryCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/country/${country.name.common}`);
    };

    return (
        <article
            onClick={handleClick}
            role="button"
            aria-label={`View details for ${country.name.common}`}
            className="group cursor-pointer"
        >
            {/* Flag */}
            <div className="aspect-[3/2] overflow-hidden bg-gray-100">
                <img
                    src={country.flags?.svg || country.flags?.png}
                    alt={country.name.common}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="mt-4 space-y-1.5">
                {/* Country Name */}
                <h3 className="text-[15px] font-medium tracking-wide text-gray-900">
                    {country.name.common}
                </h3>

                {/* Capital */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiHome className="text-[14px]" />
                    <span>{country.capital?.[0] ?? "No capital"}</span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-5 pt-1 text-xs tracking-wide text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <FiMapPin className="text-[13px]" />
                        <span>{country.region}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <FiUsers className="text-[13px]" />
                        <span>{formatPopulation(country.population)}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CountryCard;