import { useFavorites } from "../context/favoritesContext";
import CountryCard from "../components/countries/CountryCard";

import { Link } from "react-router-dom";

function Favorites() {
    const { favorites } = useFavorites()

    if (favorites.length === 0) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                <div className="mb-6 rounded-full bg-gray-50 p-6 dark:bg-tertiary">
                    <span className="text-4xl">❤️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No favorites yet</h2>
                <p className="mt-2 max-w-sm text-muted">
                    Save countries you're interested in by clicking the heart icon on any country card.
                </p>
                <Link
                    to="/"
                    className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    Explore Countries
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h2 className="mb-8 text-2xl font-semibold tracking-wide text-primary">
                Favorite Countries
            </h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((country) => (
                    <CountryCard key={country.name.common} country={country} />
                ))}
            </div>
        </div>
    )
}

export default Favorites
