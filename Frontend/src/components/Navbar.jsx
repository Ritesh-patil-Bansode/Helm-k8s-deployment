import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        isAdmin,
        logout
    } = useAuth();

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-bold text-slate-950">
                        L
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-wide text-white">
                            LuxeStay
                        </h1>

                        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400">
                            Hotel & Resorts
                        </p>
                    </div>
                </Link>

                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        to="/"
                        className="text-sm font-medium text-white transition hover:text-amber-400"
                    >
                        Home
                    </Link>

                    <Link
                        to="/hotels"
                        className="text-sm font-medium text-slate-300 transition hover:text-amber-400"
                    >
                        Hotels
                    </Link>

                    <Link
                        to="/about"
                        className="text-sm font-medium text-slate-300 transition hover:text-amber-400"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className="text-sm font-medium text-slate-300 transition hover:text-amber-400"
                    >
                        Contact
                    </Link>

                    {isAuthenticated && (
                        <Link
                            to="/bookings"
                            className="text-sm font-medium text-slate-300 transition hover:text-amber-400"
                        >
                            My Bookings
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="text-sm font-bold text-amber-400 transition hover:text-amber-300"
                        >
                            Admin
                        </Link>
                    )}

                </div>

                <div className="hidden items-center gap-3 md:flex">

                    {isAuthenticated ? (
                        <>
                            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                                <p className="text-xs text-slate-500">
                                    Welcome
                                </p>

                                <p className="text-sm font-bold text-white">
                                    {user?.name}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-2.5 text-sm font-bold text-red-300 transition hover:bg-red-400/20"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-white md:hidden"
                >
                    Menu
                </button>

            </div>

            {menuOpen && (
                <div className="border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden">

                    <div className="flex flex-col gap-4">

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="text-white"
                        >
                            Home
                        </Link>

                        <Link
                            to="/hotels"
                            onClick={() => setMenuOpen(false)}
                            className="text-slate-300"
                        >
                            Hotels
                        </Link>

                        <Link
                            to="/about"
                            onClick={() => setMenuOpen(false)}
                            className="text-slate-300"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setMenuOpen(false)}
                            className="text-slate-300"
                        >
                            Contact
                        </Link>

                        {isAuthenticated && (
                            <Link
                                to="/bookings"
                                onClick={() => setMenuOpen(false)}
                                className="font-semibold text-slate-300"
                            >
                                My Bookings
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setMenuOpen(false)}
                                className="font-bold text-amber-400"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-xs text-slate-500">
                                        Logged in as
                                    </p>

                                    <p className="mt-1 font-bold text-white">
                                        {user?.name}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-xl bg-red-400/10 px-5 py-3 text-left font-bold text-red-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-slate-300"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-xl bg-amber-400 px-5 py-3 text-center font-bold text-slate-950"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}

                    </div>

                </div>
            )}

        </nav>
    );
}

export default Navbar;
