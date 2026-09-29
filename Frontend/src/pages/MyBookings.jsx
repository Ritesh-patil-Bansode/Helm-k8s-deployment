import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cancelBooking, getMyBookings } from "../services/api";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    const loadBookings = async () => {
        try {
            const data = await getMyBookings(token);
            setBookings(data);
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        setError("");
        setMessage("");

        try {
            await cancelBooking(bookingId, token);

            setMessage("Booking cancelled successfully.");

            await loadBookings();
        } catch (error) {
            setError(error.message);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 pb-24 pt-32">

            <div className="mx-auto max-w-7xl">

                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">
                        Your Account
                    </p>

                    <h1 className="mt-3 text-5xl font-black text-slate-950">
                        My Bookings
                    </h1>

                    <p className="mt-4 text-slate-500">
                        View and manage your hotel reservations.
                    </p>
                </div>

                {message && (
                    <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="py-24 text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-amber-400" />

                        <p className="mt-5 font-semibold text-slate-600">
                            Loading your bookings...
                        </p>
                    </div>
                )}

                {!loading && bookings.length === 0 && (
                    <div className="mt-12 rounded-3xl bg-white p-16 text-center shadow-sm">

                        <h2 className="text-2xl font-black text-slate-950">
                            No bookings yet
                        </h2>

                        <p className="mt-3 text-slate-500">
                            You have not booked any hotel yet.
                        </p>

                        <Link
                            to="/hotels"
                            className="mt-7 inline-block rounded-xl bg-slate-950 px-7 py-3 font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                        >
                            Explore Hotels
                        </Link>

                    </div>
                )}

                {!loading && bookings.length > 0 && (
                    <div className="mt-10 space-y-6">

                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                            >

                                <div className="grid md:grid-cols-[280px_1fr]">

                                    <img
                                        src={booking.hotel?.image}
                                        alt={booking.hotel?.name}
                                        className="h-64 w-full object-cover md:h-full"
                                    />

                                    <div className="p-7">

                                        <div className="flex flex-col justify-between gap-4 sm:flex-row">

                                            <div>
                                                <p className="text-sm font-semibold text-amber-600">
                                                    {booking.hotel?.location}
                                                </p>

                                                <h2 className="mt-2 text-2xl font-black text-slate-950">
                                                    {booking.hotel?.name}
                                                </h2>
                                            </div>

                                            <span
                                                className={`h-fit rounded-full px-4 py-2 text-xs font-bold uppercase ${
                                                    booking.status === "confirmed"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {booking.status}
                                            </span>

                                        </div>

                                        <div className="mt-7 grid gap-4 sm:grid-cols-3">

                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Check In
                                                </p>

                                                <p className="mt-2 font-bold text-slate-950">
                                                    {formatDate(booking.checkIn)}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Check Out
                                                </p>

                                                <p className="mt-2 font-bold text-slate-950">
                                                    {formatDate(booking.checkOut)}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-slate-50 p-4">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Guests
                                                </p>

                                                <p className="mt-2 font-bold text-slate-950">
                                                    {booking.guests}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="mt-6 flex flex-col justify-between gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">

                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Total Price
                                                </p>

                                                <p className="mt-1 text-3xl font-black text-slate-950">
                                                    ₹{booking.totalPrice}
                                                </p>
                                            </div>

                                            {booking.status === "confirmed" && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleCancel(booking._id)}
                                                    className="rounded-xl bg-red-50 px-6 py-3 font-bold text-red-600 transition hover:bg-red-100"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </main>
    );
}

export default MyBookings;
