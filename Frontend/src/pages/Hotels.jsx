
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { getHotels } from "../services/api";

function Hotels() {
    const [searchParams] = useSearchParams();

    const initialSearch = searchParams.get("search") || "";

    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState(initialSearch);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadHotels = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login to view hotels.");
                setLoading(false);
                return;
            }

            try {
                const data = await getHotels(token);
                setHotels(data);
            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
        };

        loadHotels();
    }, []);

    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    const filteredHotels = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        if (!searchValue) {
            return hotels;
        }

        return hotels.filter((hotel) => {
            return (
                hotel.name.toLowerCase().includes(searchValue) ||
                hotel.location.toLowerCase().includes(searchValue)
            );
        });
    }, [hotels, search]);

    return (
        <main className="min-h-screen bg-slate-50 px-6 pb-24 pt-32">

            <section className="mx-auto max-w-7xl">

                <div className="max-w-3xl">

                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">
                        Explore Our Collection
                    </p>

                    <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
                        Find your perfect
                        <span className="block bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                            place to stay.
                        </span>
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-slate-500">
                        Browse our collection of hotels and discover comfortable
                        stays across different destinations.
                    </p>

                </div>

                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center">

                        <div className="flex-1">

                            <label
                                htmlFor="hotel-search"
                                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                            >
                                Search Hotels
                            </label>

                            <input
                                id="hotel-search"
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search by hotel name or location..."
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
                            />

                        </div>

                        <div className="rounded-2xl bg-slate-950 px-6 py-4 text-center">

                            <p className="text-2xl font-black text-amber-400">
                                {filteredHotels.length}
                            </p>

                            <p className="text-xs font-medium text-slate-400">
                                Hotels Found
                            </p>

                        </div>

                    </div>

                </div>

                {loading && (
                    <div className="py-24 text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400" />

                        <p className="mt-5 font-semibold text-slate-600">
                            Loading hotels...
                        </p>

                    </div>
                )}

                {error && (
                    <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                        {error}
                    </div>
                )}

                {!loading && !error && filteredHotels.length === 0 && (
                    <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-sm">

                        <h2 className="text-2xl font-bold text-slate-900">
                            No hotels found
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Try searching with another hotel name or location.
                        </p>

                    </div>
                )}

                {!loading && !error && filteredHotels.length > 0 && (
                    <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                        {filteredHotels.map((hotel) => (
                            <HotelCard
                                key={hotel._id}
                                hotel={hotel}
                            />
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}

export default Hotels;


