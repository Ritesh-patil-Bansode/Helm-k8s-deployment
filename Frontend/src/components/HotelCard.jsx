
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="relative h-64 overflow-hidden">

                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900">
                    Featured
                </div>

                <div className="absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1.5 text-sm font-bold text-amber-400 backdrop-blur">
                    ★ {hotel.rating}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

            </div>

            <div className="p-6">

                <p className="text-sm font-medium text-amber-600">
                    {hotel.location}
                </p>

                <h3 className="mt-2 line-clamp-1 text-xl font-bold text-slate-900">
                    {hotel.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {hotel.description}
                </p>

                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">

                    <div>
                        <span className="text-2xl font-black text-slate-900">
                            ₹{hotel.price}
                        </span>

                        <span className="ml-1 text-sm text-slate-500">
                            / night
                        </span>
                    </div>

                    <Link
                        to={`/hotels/${hotel._id}`}
                        className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
                    >
                        View Details
                    </Link>

                </div>

            </div>

        </article>
    );
}

export default HotelCard;

