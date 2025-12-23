import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
    label: string;
    href: string;
    onClick?: () => void;
}

const NAV_LINKS: NavLinkProps[] = [
    { label: "Home", href: "/" },
    { label: "Favorites", href: "/favorites" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    return (
        <nav className="bg-white border-b border-tertiary">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-lg font-semibold tracking-wide text-primary"
                    >
                        CountryApp
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
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
                        className="md:hidden text-primary text-xl"
                        aria-label="Toggle Menu"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t border-tertiary">
                    <div className="flex flex-col gap-4 px-6 py-6">
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

const NavLink: React.FC<NavLinkProps> = ({ label, href }) => {
    const { pathname } = useLocation();
    const isActive = pathname === href;

    return (
        <Link
            to={href}
            className={`relative text-sm tracking-wide transition
        ${isActive
                    ? "text-primary font-medium"
                    : "text-muted hover:text-primary"
                }
      `}
        >
            {label}

            {/* Underline */}
            {isActive && (
                <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-primary" />
            )}
        </Link>
    );
};

const MobileLink: React.FC<NavLinkProps> = ({ label, href, onClick }) => {
    const { pathname } = useLocation();
    const isActive = pathname === href;

    return (
        <Link
            to={href}
            onClick={onClick}
            className={`text-base tracking-wide transition
        ${isActive
                    ? "text-primary font-medium"
                    : "text-muted"
                }
      `}
        >
            {label}
        </Link>
    );
};
