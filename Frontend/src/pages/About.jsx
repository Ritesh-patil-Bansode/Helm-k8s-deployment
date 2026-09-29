
import { Link } from "react-router-dom";

function About() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24">

            <section className="relative overflow-hidden px-6 py-24">

                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    <div className="max-w-3xl">

                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                            About LuxeStay
                        </p>

                        <h1 className="mt-5 text-5xl font-black leading-tight text-white md:text-6xl">
                            Making every stay
                            <span className="block bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                worth remembering.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                            LuxeStay is a modern hotel discovery platform designed
                            to help travelers find comfortable stays, explore
                            destinations and enjoy a simple hotel booking experience.
                        </p>

                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-3">

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                            <div className="text-4xl font-black text-amber-400">
                                500+
                            </div>

                            <h2 className="mt-4 text-xl font-bold text-white">
                                Hotels
                            </h2>

                            <p className="mt-3 leading-7 text-slate-400">
                                Explore a growing collection of hotels across
                                different destinations.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                            <div className="text-4xl font-black text-amber-400">
                                50+
                            </div>

                            <h2 className="mt-4 text-xl font-bold text-white">
                                Destinations
                            </h2>

                            <p className="mt-3 leading-7 text-slate-400">
                                Discover stays in popular cities and beautiful
                                travel destinations.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                            <div className="text-4xl font-black text-amber-400">
                                4.8/5
                            </div>

                            <h2 className="mt-4 text-xl font-bold text-white">
                                Guest Experience
                            </h2>

                            <p className="mt-3 leading-7 text-slate-400">
                                We focus on making hotel discovery simple,
                                convenient and enjoyable.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section className="bg-white px-6 py-24">

                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

                    <div className="overflow-hidden rounded-[2rem]">
                        <img
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
                            alt="Luxury hotel"
                            className="h-[500px] w-full object-cover"
                        />
                    </div>

                    <div>

                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                            Our Mission
                        </p>

                        <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 md:text-5xl">
                            A better way to discover your next stay.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-600">
                            We believe finding a hotel should be simple and
                            enjoyable. LuxeStay brings hotel information,
                            destinations, amenities and pricing together in
                            one convenient platform.
                        </p>

                        <p className="mt-5 leading-8 text-slate-600">
                            Whether you are planning a business trip, a family
                            vacation or a relaxing getaway, our platform helps
                            you explore different stays and find an option
                            that fits your journey.
                        </p>

                        <Link
                            to="/hotels"
                            className="mt-8 inline-flex rounded-xl bg-slate-950 px-7 py-3.5 font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                        >
                            Explore Hotels
                        </Link>

                    </div>

                </div>

            </section>

            <section className="bg-slate-50 px-6 py-24">

                <div className="mx-auto max-w-7xl text-center">

                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                        Why LuxeStay
                    </p>

                    <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
                        Everything you need for your stay.
                    </h2>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-3xl bg-white p-7 shadow-sm">
                            <div className="text-3xl">🏨</div>
                            <h3 className="mt-5 text-lg font-bold text-slate-950">
                                Quality Hotels
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Explore a wide collection of comfortable stays.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-7 shadow-sm">
                            <div className="text-3xl">📍</div>
                            <h3 className="mt-5 text-lg font-bold text-slate-950">
                                Great Locations
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Discover hotels across multiple destinations.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-7 shadow-sm">
                            <div className="text-3xl">💎</div>
                            <h3 className="mt-5 text-lg font-bold text-slate-950">
                                Premium Experience
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Enjoy a modern and simple hotel discovery experience.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-7 shadow-sm">
                            <div className="text-3xl">⚡</div>
                            <h3 className="mt-5 text-lg font-bold text-slate-950">
                                Simple & Fast
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Find useful hotel information quickly and easily.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default About;

