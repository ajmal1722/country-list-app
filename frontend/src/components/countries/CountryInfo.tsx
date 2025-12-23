import { FiMapPin, FiUsers, FiClock, FiDollarSign, FiMessageCircle } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import type { Country } from "../../types/country";

interface CountryInfoProps {
    country: Country;
}

const CountryInfo = ({ country }: CountryInfoProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Flag Section */}
            <div className="w-full">
                <div className="aspect-[3/2] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                    <img
                        src={country.flags.svg}
                        alt={country.flags.alt || `Flag of ${country.name.common}`}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight  sm:text-5xl">
                        {country.name.common}
                    </h1>
                    <p className="mt-2 text-lg text-muted font-medium">
                        {country.name.official}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoItem
                        icon={<BsBuilding />}
                        label="Capital"
                        value={country.capital?.[0] ?? "N/A"}
                    />
                    <InfoItem
                        icon={<FiMapPin />}
                        label="Region"
                        value={`${country.region} (${country.subregion ?? "N/A"})`}
                    />
                    <InfoItem
                        icon={<FiUsers />}
                        label="Population"
                        value={country.population.toLocaleString()}
                    />
                    <InfoItem
                        icon={<FiClock />}
                        label="Time Zones"
                        value={country.timezones[0]} // Displaying first timezone for brevity
                    />
                    <InfoItem
                        icon={<FiMessageCircle />}
                        label="Languages"
                        value={
                            country.languages
                                ? Object.values(country.languages).join(", ")
                                : "N/A"
                        }
                    />
                    <InfoItem
                        icon={<FiDollarSign />}
                        label="Currencies"
                        value={
                            country.currencies
                                ? Object.values(country.currencies)
                                    .map((c) => `${c.name} (${c.symbol})`)
                                    .join(", ")
                                : "N/A"
                        }
                    />
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 flex-shrink-0 text-xl text-primary">{icon}</div>
        <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {label}
            </p>
            <p className="text-base font-medium text-gray-500 ">{value}</p>
        </div>
    </div>
);

export default CountryInfo;
