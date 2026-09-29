
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const navigate = useNavigate();

    const [destination, setDestination] = useState("");

    const [checkIn, setCheckIn] = useState("");

    const [guests, setGuests] = useState("1");

    const handleSearch = () => {
        const searchValue = destination.trim();

        if (searchValue) {
            navigate(`/hotels?search=${encodeURIComponent(searchValue)}`);
        } else {
            navigate("/hotels");
        }
    };

    return (
        <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-6">

            <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">

                <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Destination
                        </p>

                        <input
                            type="text"
                            value={destination}
                            onChange={(event) => setDestination(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            placeholder="Where do you want to stay?"
                            className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        />

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Check In
                        </p>

                        <input
                            type="date"
                            value={checkIn}
                            onChange={(event) => setCheckIn(event.target.value)}
                            className="mt-1 w-full bg-transparent text-sm text-white outline-none"
                        />

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Guests
                        </p>

                        <select
                            value={guests}
                            onChange={(event) => setGuests(event.target.value)}
                            className="mt-1 w-full bg-transparent text-sm text-white outline-none"
                        >
                            <option value="1" className="bg-slate-900">
                                1 Guest
                            </option>

                            <option value="2" className="bg-slate-900">
                                2 Guests
                            </option>

                            <option value="3" className="bg-slate-900">
                                3 Guests
                            </option>

                            <option value="4" className="bg-slate-900">
                                4+ Guests
                            </option>
                        </select>

                    </div>

                    <button
                        type="button"
                        onClick={handleSearch}
                        className="rounded-2xl bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
                    >
                        Search
                    </button>

                </div>

            </div>

        </div>
    );
}

export default SearchBar;


