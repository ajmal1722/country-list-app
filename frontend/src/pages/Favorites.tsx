import { useFavorites } from "../context/favoritesContext";
import CountryCard from "../components/countries/CountryCard";

function Favorites() {
    const { favorites } = useFavorites()

    if (favorites.length === 0) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold text-gray-900">No favorites yet</h2>
                <p className="mt-2 text-gray-500">Start adding countries to your favorites list.</p>
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
