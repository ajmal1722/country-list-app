import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
    label: string;
    href: string;
    onClick?: () => void;
}

/* Centralized nav config (senior habit) */
const NAV_LINKS: NavLinkProps[] = [
    { label: "Home", href: "/" },
    { label: "Favorites", href: "/favorites" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    return (
        <nav className="bg-primary text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-secondary">
                        CountryApp
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.label}
                                label={link.label}
                                href={link.href}
                            />
                        ))}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="md:hidden rounded-md p-2 hover:bg-secondary hover:text-primary transition"
                        aria-label="Toggle Menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-primary border-t border-secondary/30">
                    <div className="flex flex-col gap-1 px-4 py-4">
                        {NAV_LINKS.map((link) => (
                            <MobileLink
                                key={link.label}
                                label={link.label}
                                href={link.href}
                                onClick={closeMenu}
                            />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

/* Desktop link */
const NavLink: React.FC<NavLinkProps> = ({ label, href }) => {
    const { pathname } = useLocation();
    const isActive = pathname === href;

    return (
        <Link
            to={href}
            className={`rounded px-3 py-2 transition
                ${isActive
                    ? "bg-secondary text-primary font-semibold"
                    : "hover:bg-secondary hover:text-primary"}
            `}
        >
            {label}
        </Link>
    );
};

/* Mobile link */
const MobileLink: React.FC<NavLinkProps> = ({ label, href, onClick }) => {
    const { pathname } = useLocation();
    const isActive = pathname === href;

    return (
        <Link
            to={href}
            onClick={onClick}
            className={`rounded px-3 py-2 transition
                ${isActive
                    ? "bg-secondary text-primary font-semibold"
                    : "hover:bg-secondary hover:text-primary"}
            `}
        >
            {label}
        </Link>
    );
};
