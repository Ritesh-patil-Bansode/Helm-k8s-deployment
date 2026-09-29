import { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext";
import {
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    getContacts
} from "../services/api";

function AdminDashboard() {
    const { token } = useAuth();

    const [hotels, setHotels] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [contactsLoading, setContactsLoading] = useState(true);

    const emptyForm = {
        name: "",
        location: "",
        description: "",
        price: "",
        rating: "",
        image: "",
        amenities: "",
        contact: ""
    };

    const [form, setForm] = useState(emptyForm);

    const loadHotels = async () => {
        try {
            const data = await getHotels(token);
            setHotels(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const loadContacts = async () => {
        try {
            const data = await getContacts(token);
            setContacts(data);
        } catch (error) {
            setError(error.message);
        }

        setContactsLoading(false);
    };

    useEffect(() => {
        loadHotels();
        loadContacts();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        const hotelData = {
            ...form,
            price: Number(form.price),
            rating: Number(form.rating),
            amenities: form.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
        };

        try {
            if (editingId) {
                await updateHotel(editingId, hotelData, token);
                setMessage("Hotel updated successfully");
            } else {
                await createHotel(hotelData, token);
                setMessage("Hotel created successfully");
            }

            setForm(emptyForm);
            setEditingId(null);

            await loadHotels();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (hotel) => {
        setEditingId(hotel._id);

        setForm({
            name: hotel.name,
            location: hotel.location,
            description: hotel.description,
            price: hotel.price,
            rating: hotel.rating,
            image: hotel.image,
            amenities: hotel.amenities?.join(", ") || "",
            contact: hotel.contact || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        setMessage("");
        setError("");

        try {
            await deleteHotel(id, token);
            setMessage("Hotel deleted successfully");
            await loadHotels();
        } catch (error) {
            setError(error.message);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 pb-24 pt-32">

            <div className="mx-auto max-w-7xl">

                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">
                        Admin Panel
                    </p>

                    <h1 className="mt-3 text-5xl font-black text-slate-950">
                        Hotel Management
                    </h1>

                    <p className="mt-4 text-slate-500">
                        Create, update and manage hotels and customer messages.
                    </p>
                </div>

                {message && (
                    <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-black text-slate-950">
                        {editingId ? "Update Hotel" : "Add New Hotel"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-5 md:grid-cols-2"
                    >

                        {[
                            ["name", "Hotel Name"],
                            ["location", "Location"],
                            ["price", "Price"],
                            ["rating", "Rating"],
                            ["image", "Image URL"],
                            ["contact", "Contact"]
                        ].map(([name, label]) => (
                            <div key={name}>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {label}
                                </label>

                                <input
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400"
                                />

                            </div>
                        ))}

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400"
                            />

                        </div>

                        <div className="md:col-span-2">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Amenities
                            </label>

                            <input
                                name="amenities"
                                value={form.amenities}
                                onChange={handleChange}
                                placeholder="WiFi, Parking, Gym"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-amber-400"
                            />

                        </div>

                        <div className="flex gap-3 md:col-span-2">

                            <button
                                type="submit"
                                className="rounded-xl bg-slate-950 px-7 py-3 font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                            >
                                {editingId ? "Update Hotel" : "Create Hotel"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="rounded-xl border border-slate-200 px-7 py-3 font-bold text-slate-700"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>

                <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-2xl font-black text-slate-950">
                                Hotels
                            </h2>

                            <p className="mt-1 text-slate-500">
                                {hotels.length} hotels in database
                            </p>
                        </div>

                    </div>

                    <div className="mt-6 space-y-4">

                        {hotels.map((hotel) => (
                            <div
                                key={hotel._id}
                                className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-5 md:flex-row md:items-center"
                            >

                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="h-24 w-32 rounded-xl object-cover"
                                />

                                <div className="flex-1">

                                    <h3 className="font-bold text-slate-950">
                                        {hotel.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {hotel.location}
                                    </p>

                                    <p className="mt-2 font-bold text-amber-600">
                                        ₹{hotel.price}
                                    </p>

                                </div>

                                <div className="flex gap-3">

                                    <button
                                        type="button"
                                        onClick={() => handleEdit(hotel)}
                                        className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-100"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(hotel._id)}
                                        className="rounded-xl bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">

                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                        <div>
                            <h2 className="text-2xl font-black text-slate-950">
                                Contact Messages
                            </h2>

                            <p className="mt-1 text-slate-500">
                                Messages received from customers.
                            </p>
                        </div>

                        <div className="rounded-xl bg-slate-950 px-5 py-3 text-center">
                            <p className="text-2xl font-black text-amber-400">
                                {contacts.length}
                            </p>

                            <p className="text-xs text-slate-400">
                                Messages
                            </p>
                        </div>

                    </div>

                    {contactsLoading && (
                        <div className="py-12 text-center">
                            <p className="font-semibold text-slate-500">
                                Loading messages...
                            </p>
                        </div>
                    )}

                    {!contactsLoading && contacts.length === 0 && (
                        <div className="mt-6 rounded-2xl bg-slate-50 p-10 text-center">
                            <p className="font-semibold text-slate-500">
                                No contact messages yet.
                            </p>
                        </div>
                    )}

                    {!contactsLoading && contacts.length > 0 && (
                        <div className="mt-6 space-y-5">

                            {contacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    className="rounded-2xl border border-slate-200 p-6"
                                >

                                    <div className="flex flex-col justify-between gap-4 sm:flex-row">

                                        <div>
                                            <h3 className="text-lg font-black text-slate-950">
                                                {contact.subject}
                                            </h3>

                                            <p className="mt-1 text-sm text-amber-600">
                                                {contact.name} · {contact.email}
                                            </p>
                                        </div>

                                        <p className="text-xs text-slate-400">
                                            {formatDate(contact.createdAt)}
                                        </p>

                                    </div>

                                    <div className="mt-5 rounded-xl bg-slate-50 p-5">
                                        <p className="leading-7 text-slate-600">
                                            {contact.message}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}

export default AdminDashboard;
