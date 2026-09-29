import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../services/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(
                formData.email,
                formData.password
            );

            login(data.token, data.user);

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 px-6 pb-16 pt-32">

            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl lg:grid-cols-2">

                <div className="relative hidden min-h-[650px] overflow-hidden lg:block">

                    <img
                        src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85"
                        alt="Luxury hotel"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-slate-950/55" />

                    <div className="absolute bottom-12 left-10 right-10">

                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
                            Welcome back
                        </p>

                        <h1 className="mt-4 text-4xl font-black leading-tight text-white">
                            Your perfect stay
                            <span className="block text-amber-400">
                                is waiting for you.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-md leading-7 text-slate-300">
                            Sign in to explore beautiful hotels and manage your
                            travel experience.
                        </p>

                    </div>

                </div>

                <div className="flex items-center bg-slate-900 p-8 sm:p-12 lg:p-16">

                    <div className="w-full">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                            LuxeStay
                        </p>

                        <h2 className="mt-3 text-4xl font-black text-white">
                            Welcome back
                        </h2>

                        <p className="mt-3 text-slate-400">
                            Sign in to continue your journey.
                        </p>

                        {error && (
                            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-amber-400 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>

                        </form>

                        <p className="mt-8 text-center text-sm text-slate-400">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-bold text-amber-400 hover:text-amber-300"
                            >
                                Create account
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
