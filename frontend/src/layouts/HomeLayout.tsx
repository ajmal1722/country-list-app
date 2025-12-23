import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

export default function HomeLayout() {
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
