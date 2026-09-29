import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
        setSuccess("");
        setLoading(true);

        try {
            await registerUser(
                formData.name,
                formData.email,
                formData.password
            );

            setSuccess("Account created successfully. Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 px-6 pb-16 pt-32">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl sm:p-12">

                <div className="mx-auto max-w-md">

                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                            LuxeStay
                        </p>

                        <h1 className="mt-3 text-4xl font-black text-white">
                            Create your account
                        </h1>

                        <p className="mt-3 text-slate-400">
                            Join us and discover your next unforgettable stay.
                        </p>
                    </div>

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                            />
                        </div>

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
                                placeholder="Create a password"
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-amber-400 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>

                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-amber-400 hover:text-amber-300"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Register;
