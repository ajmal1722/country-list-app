import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import Loading from "../components/Loading";

// Route-level code splitting
const CountryList = lazy(() => import("../pages/CountryList"));
const CountryDetails = lazy(() => import("../pages/CountryDetails"));
const Favorites = lazy(() => import("../pages/Favorites"));

export const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <HomeLayout />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <CountryList />,
            },
            {
                path: "country/:id",
                element: <CountryDetails />,
            },
            {
                path: "favorites",
                element: <Favorites />,
            },
        ],
    },
]);