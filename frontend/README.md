# Country Explorer Dashboard

A responsive React application that allows users to explore country data, view detailed information, check weather conditions, and manage favorite countries. Built for the React Developer Machine Test.

## 🚀 Features

### Core Features
-   **Country Listing**: Fetches and displays all countries from REST Countries API with pagination.
-   **Search & Filter**: 
    -   Search countries by name (with debouncing).
    -   Filter by Region (Asia, Europe, Africa, Americas, Oceania).
    -   Filter by Population (<10M, 10M–50M, >50M).
-   **Country Details**: Detailed view showing flag, capital, region, population, languages, currencies, and time zones.
-   **Weather Integration**: Real-time weather data for the country's capital using OpenWeatherMap API.
-   **Favorites**: Mark countries as favorites with persistence using LocalStorage.

### Bonus Features
-   **Dark/Light Mode**: Fully themeable UI with a toggle switch.
-   **Responsive Design**: Optimized for both mobile and desktop devices.
-   **Clean UI**: Modern design using Tailwind CSS.

## 🛠️ Tech Stack

-   **Frontend**: React (Hooks), TypeScript, Vite
-   **Styling**: Tailwind CSS v4
-   **Routing**: React Router DOM
-   **State Management**: Context API
-   **HTTP Client**: Axios
-   **Icons**: React Icons

## ⚙️ Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd lilac/frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```env
    VITE_OPENWEATHER_API_KEY=your_api_key_here
    ```
    > Note: A default key might be configured in the code for testing purposes, but using your own is recommended.

4.  **Run the application**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── countries/      # Country-related components (Card, List, Filters)
│   └── shared/         # Generic components (Navbar, Loading, etc.)
├── context/            # Context Providers (Favorites, Theme)
├── hooks/              # Custom Hooks (useDebounce)
├── pages/              # Page components (Home, Favorites, Details)
├── services/           # API integration services
├── types/              # TypeScript definitions
└── App.tsx             # Main application entry
```
