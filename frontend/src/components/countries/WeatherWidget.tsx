import { FiWind, FiDroplet } from "react-icons/fi";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import type { WeatherResponse } from "../../types/weather";

interface WeatherWidgetProps {
    weather: WeatherResponse | null;
    loading: boolean;
    error: string | null;
}

const WeatherWidget = ({ weather, loading, error }: WeatherWidgetProps) => {
    if (loading) {
        return (
            <div className="mt-12 w-full animate-pulse rounded-2xl bg-gray-100 p-8">
                <div className="h-6 w-1/3 rounded bg-gray-200 mb-4"></div>
                <div className="h-20 w-full rounded bg-gray-200"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-12 rounded-2xl bg-red-50 p-6 text-red-600 border border-red-100">
                <p>{error}</p>
            </div>
        );
    }

    if (!weather) return null;

    const getWeatherIcon = (main: string) => {
        switch (main.toLowerCase()) {
            case "clouds": return <WiCloud className="text-6xl text-gray-400" />;
            case "rain": return <WiRain className="text-6xl text-blue-400" />;
            case "snow": return <WiSnow className="text-6xl text-blue-200" />;
            case "thunderstorm": return <WiThunderstorm className="text-6xl text-purple-500" />;
            default: return <WiDaySunny className="text-6xl text-yellow-500" />;
        }
    };

    return (
        <div className="mt-16 border-t border-gray-100 pt-10 dark:border-tertiary">
            <h2 className="mb-6 text-2xl font-bold text-gray-500">
                Weather in {weather.name}
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Main Weather Card */}
                <div className="relative flex-1 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white shadow-xl">
                    {/* Decorative circle */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-5xl font-bold tracking-tighter">
                                    {Math.round(weather.main.temp)}°
                                </h3>
                                <span className="text-xl font-medium text-blue-100">C</span>
                            </div>
                            <p className="mt-1 text-lg font-medium text-blue-100 capitalize">
                                {weather.weather[0].description}
                            </p>
                        </div>
                        <div>
                            {getWeatherIcon(weather.weather[0].main)}
                        </div>
                    </div>
                </div>

                {/* Details Cards */}
                <div className="grid flex-1 grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-6 dark:bg-tertiary">
                        <div className="flex items-center gap-2 text-muted mb-2">
                            <FiDroplet />
                            <span className="text-sm font-medium uppercase tracking-wider">Humidity</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-500">
                            {weather.main.humidity}%
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-gray-50 p-6 dark:bg-tertiary">
                        <div className="flex items-center gap-2 text-muted mb-2">
                            <FiWind />
                            <span className="text-sm font-medium uppercase tracking-wider">Wind</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-500">
                            {weather.wind.speed} <span className="text-sm font-normal text-muted">m/s</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
