import { createHttpClient } from "./createHttpClient";
import type { Country } from "../types/country";

const countriesClient = createHttpClient(
  "https://restcountries.com/v3.1"
)

export const getAllCountries = () => {
  return countriesClient.get<Country[]>("/all")
}

export const getCountryByName = (name: string) => {
  return countriesClient.get<Country[]>(`/name/${name}`)
}
