import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createBooking, getHotelById } from "../services/api";

function HotelDetails() {
    const { id } = useParams();

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showBooking, setShowBooking] = useState(false);

    const [booking, setBooking] = useState({
        checkIn: "",
        checkOut: "",
        guests: "1"
    });

    const [bookingMessage, setBookingMessage] = useState("");
    const [bookingError, setBookingError] = useState("");
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const loadHotel = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login to view hotel details.");
                setLoading(false);
                return;
            }

            try {
                const data = await getHotelById(id, token);
                setHotel(data);
            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
        };

        loadHotel();
    }, [id]);

    const handleBookingChange = (event) => {
        setBooking({
            ...booking,
            [event.target.name]: event.target.value
        });
    };

    const handleBookingSubmit = async (event) => {
        event.preventDefault();

        setBookingMessage("");
        setBookingError("");
        setBookingLoading(true);

        const token = localStorage.getItem("token");

        try {
            const data = await createBooking(
                id,
                booking.checkIn,
                booking.checkOut,
                booking.guests,
                token
            );

            setBookingMessage(
                `Booking confirmed. Total price: ₹${data.booking.totalPrice}`
            );

            setBooking({
                checkIn: "",
                checkOut: "",
                guests: "1"
            });

            setShowBooking(false);
        } catch (error) {
            setBookingError(error.message);
        }

        setBookingLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 px-6 pt-32 text-center">
                <p className="text-lg font-semibold text-white">
                    Loading hotel details...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 px-6 pt-32">
                <div className="mx-auto max-w-2xl rounded-2xl border border-red-400/20 bg-red-400/10 p-8 text-center">
                    <p className="text-red-300">
                        {error}
                    </p>

                    <Link
                        to="/login"
                        className="mt-6 inline-block rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 px-6 pb-20 pt-32">

            <div className="mx-auto max-w-7xl">

                <Link
                    to="/hotels"
                    className="mb-8 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                    ← Back to Hotels
                </Link>

                {bookingMessage && (
                    <div className="mb-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-300">
                        {bookingMessage}
                    </div>
                )}

                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">

                    <div className="grid lg:grid-cols-2">

                        <div className="relative min-h-[400px] lg:min-h-[650px]">

                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                            <div className="absolute bottom-8 left-8">
                                <div className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950">
                                    ★ {hotel.rating} Rating
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
                                Luxury Stay
                            </p>

                            <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
                                {hotel.name}
                            </h1>

                            <p className="mt-4 text-lg text-slate-400">
                                {hotel.location}
                            </p>

                            <div className="mt-8 h-px bg-white/10" />

                            <p className="mt-8 text-base leading-8 text-slate-300">
                                {hotel.description}
                            </p>

                            <div className="mt-8">

                                <h2 className="text-lg font-bold text-white">
                                    Amenities
                                </h2>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    {hotel.amenities?.map((amenity) => (
                                        <span
                                            key={amenity}
                                            className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300"
                                        >
                                            {amenity}
                                        </span>
                                    ))}

                                </div>

                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                                    <p className="text-sm text-slate-500">
                                        Price per night
                                    </p>

                                    <p className="mt-1 text-3xl font-black text-white">
                                        ₹{hotel.price}
                                    </p>

                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                                    <p className="text-sm text-slate-500">
                                        Contact
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-white">
                                        {hotel.contact}
                                    </p>

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowBooking(!showBooking);
                                    setBookingError("");
                                }}
                                className="mt-8 w-full rounded-xl bg-amber-400 py-4 font-bold text-slate-950 transition hover:bg-amber-300"
                            >
                                {showBooking ? "Close Booking" : "Book This Hotel"}
                            </button>

                            {showBooking && (
                                <form
                                    onSubmit={handleBookingSubmit}
                                    className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6"
                                >

                                    <h2 className="text-xl font-bold text-white">
                                        Complete Your Booking
                                    </h2>

                                    {bookingError && (
                                        <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
                                            {bookingError}
                                        </div>
                                    )}

                                    <div className="mt-5 space-y-4">

                                        <div>
                                            <label className="mb-2 block text-sm text-slate-300">
                                                Check In
                                            </label>

                                            <input
                                                type="date"
                                                name="checkIn"
                                                value={booking.checkIn}
                                                onChange={handleBookingChange}
                                                required
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-slate-300">
                                                Check Out
                                            </label>

                                            <input
                                                type="date"
                                                name="checkOut"
                                                value={booking.checkOut}
                                                onChange={handleBookingChange}
                                                required
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-slate-300">
                                                Guests
                                            </label>

                                            <select
                                                name="guests"
                                                value={booking.guests}
                                                onChange={handleBookingChange}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400"
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
                                                    4 Guests
                                                </option>
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={bookingLoading}
                                            className="w-full rounded-xl bg-amber-400 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
                                        >
                                            {bookingLoading
                                                ? "Confirming..."
                                                : "Confirm Booking"}
                                        </button>

                                    </div>

                                </form>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default HotelDetails;
