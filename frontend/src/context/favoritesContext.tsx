import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import type { Country } from "../types/country"

interface FavoritesContextValue {
    favorites: Country[]
    addFavorite: (country: Country) => void
    removeFavorite: (name: string) => void
    isFavorite: (name: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(
    null
)

const STORAGE_KEY = "favorite_countries_v2"

export function FavoritesProvider({
    children,
}: {
    children: ReactNode
}) {
    const [favorites, setFavorites] = useState<Country[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (e) {
                console.error("Failed to parse favorites", e)
            }
        }
        return []
    })

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        )
    }, [favorites])

    const addFavorite = (country: Country) => {
        setFavorites((prev) => {
            if (prev.some(c => c.name.common === country.name.common)) {
                return prev;
            }
            return [...prev, country];
        })
    }

    const removeFavorite = (name: string) => {
        setFavorites((prev) =>
            prev.filter((item) => item.name.common !== name)
        )
    }

    const isFavorite = (name: string) => {
        return favorites.some((c) => c.name.common === name)
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error(
            "useFavorites must be used within FavoritesProvider"
        )
    }
    return context
}
