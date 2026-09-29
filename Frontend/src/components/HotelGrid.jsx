import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { getHotels } from "../services/api";

function HotelGrid() {
    const [hotels, setHotels] = useState([]);
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

    return (
        <section className="bg-slate-50 px-6 py-24">
            <div className="mx-auto max-w-7xl">

                <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                            Explore
                        </p>

                        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                            Popular stays
                        </h2>

                        <p className="mt-4 max-w-xl text-slate-500">
                            Discover beautiful hotels from our collection.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="py-20 text-center">
                        <p className="text-lg font-semibold text-slate-600">
                            Loading hotels...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {hotels.map((hotel) => (
                            <HotelCard
                                key={hotel._id}
                                hotel={hotel}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}

export default HotelGrid;
