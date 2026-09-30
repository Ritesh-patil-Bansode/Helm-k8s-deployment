import { useState } from "react";
import { createContact } from "../services/api";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

        setSubmitted(false);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitted(false);
        setError("");

        try {
            await createContact(
                formData.name,
                formData.email,
                formData.subject,
                formData.message
            );

            setSubmitted(true);

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            setError(error.message || "Failed to send message");
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32">

            <section className="mx-auto max-w-7xl">

                <div className="max-w-3xl">

                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                        Contact Us
                    </p>

                    <h1 className="mt-5 text-5xl font-black leading-tight text-white md:text-6xl">
                        We're here to
                        <span className="block bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                            help you.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Have a question about a hotel, your account or our
                        platform? Send us a message and our team will get back
                        to you.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">

                    <div className="space-y-6">

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-2xl">
                                ✉
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-white">
                                Email
                            </h2>

                            <p className="mt-2 text-slate-400">
                                support@luxestay.com
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-2xl">
                                ☎
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-white">
                                Phone
                            </h2>

                            <p className="mt-2 text-slate-400">
                                +91 90000 00000
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-2xl">
                                📍
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-white">
                                Office
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Pune, Maharashtra, India
                            </p>
                        </div>

                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8 shadow-2xl sm:p-10 lg:col-span-2">

                        <div>
                            <h2 className="text-3xl font-black text-white">
                                Send us a message
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Fill out the form below and we'll get back to you.
                            </p>
                        </div>

                        {submitted && (
                            <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-300">
                                Your message has been submitted successfully.
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >

                            <div className="grid gap-6 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Your Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
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

                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Message
                                </label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    rows="6"
                                    required
                                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-amber-400 py-4 font-bold text-slate-950 transition hover:bg-amber-300"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Contact;