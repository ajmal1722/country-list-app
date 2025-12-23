import { useNavigate } from "react-router-dom";
import { FiMapPin, FiUsers, FiHome } from "react-icons/fi";
import type { Country } from "../../types/country";
import { useFavorites } from "../../context/favoritesContext";
import { FiHeart } from "react-icons/fi";

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
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const favorite = isFavorite(country.name.common)

    const toggleFavorite = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation()

        favorite
            ? removeFavorite(country.name.common)
            : addFavorite(country)
    }

    const handleClick = () => {
        navigate(`/country/${country.name.common}`);
    };

    return (
        <article
            onClick={handleClick}
            role="button"
            aria-label={`View details for ${country.name.common}`}
            className="group cursor-pointer relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md hover:ring-primary/20"
        >
            {/* Favorite Button */}
            <button
                onClick={toggleFavorite}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
                <FiHeart
                    className={`text-lg transition-colors ${favorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                />
            </button>

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
            <div className="p-4 space-y-3">
                {/* Country Name */}
                <h3 className="text-base font-semibold tracking-tight text-gray-900 line-clamp-1">
                    {country.name.common}
                </h3>

                {/* Capital */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiHome className="text-[14px] shrink-0" />
                    <span className="truncate">{country.capital?.[0] ?? "No capital"}</span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 pt-1 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <FiMapPin className="text-[13px]" />
                        <span className="truncate max-w-[80px]">{country.region}</span>
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