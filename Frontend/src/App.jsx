import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelDetails from "./pages/HotelDetails";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";

function App() {
    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/hotels"
                    element={<Hotels />}
                />

                <Route
                    path="/hotels/:id"
                    element={<HotelDetails />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </div>
    );
}

export default App;
