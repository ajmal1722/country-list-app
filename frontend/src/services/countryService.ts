import { createHttpClient } from "./createHttpClient";
import type { Country } from "../types/country";

const countriesClient = createHttpClient(
    "https://restcountries.com/v3.1"
)

export const getAllCountries = (): Promise<Country[]> => {
    return countriesClient.get<Country[]>("/all", {
        params: {
            fields: "name,capital,flags,population,region"
        }
    }) as unknown as Promise<Country[]>
}

export const getCountryByName = (name: string): Promise<Country[]> => {
    const encodedName = encodeURI(name)
    return countriesClient.get<Country[]>(`/name/${encodedName}?fullText=true`) as unknown as Promise<Country[]>
}
