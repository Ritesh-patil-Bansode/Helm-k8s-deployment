import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import HotelGrid from "../components/HotelGrid";

function Home() {
    return (
        <main className="bg-slate-950">
            <Hero />
            <SearchBar />
            <HotelGrid />
        </main>
    );
}

export default Home;
