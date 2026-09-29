function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-950 pt-24">

            <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

                <div className="max-w-2xl">

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                        Premium stays. Exceptional experiences.
                    </div>

                    <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">

                        Your next

                        <span className="block bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            unforgettable stay
                        </span>

                        starts here.

                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                        Discover beautiful hotels, comfortable rooms and memorable
                        experiences at destinations you'll love.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <a
                            href="/hotels"
                            className="rounded-xl bg-amber-400 px-7 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-1 hover:bg-amber-300"
                        >
                            Explore Hotels
                        </a>

                        <a
                            href="/about"
                            className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                        >
                            Discover More
                        </a>

                    </div>

                    <div className="mt-10 flex flex-wrap gap-8">

                        <div>
                            <p className="text-2xl font-bold text-white">
                                500+
                            </p>

                            <p className="text-sm text-slate-500">
                                Hotels
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-white">
                                50+
                            </p>

                            <p className="text-sm text-slate-500">
                                Destinations
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-white">
                                4.8/5
                            </p>

                            <p className="text-sm text-slate-500">
                                Guest Rating
                            </p>
                        </div>

                    </div>

                </div>

                <div className="relative">

                    <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-2xl" />

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">

                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
                            alt="Luxury hotel"
                            className="h-[520px] w-full rounded-[1.5rem] object-cover"
                        />

                        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-xs uppercase tracking-widest text-amber-400">
                                        Featured Stay
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-white">
                                        Grand Luxury Resort
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Pune, Maharashtra
                                    </p>

                                </div>

                                <div className="rounded-xl bg-amber-400 px-3 py-2 text-sm font-bold text-slate-950">
                                    ★ 4.8
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;
