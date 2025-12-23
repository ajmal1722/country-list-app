import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <div>
            <header>
                <h1>Country App</h1>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
