const API_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
};

export const getHotels = async (token) => {
    const response = await fetch(`${API_URL}/hotels`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch hotels");
    }

    return data;
};

export const getHotelById = async (id, token) => {
    const response = await fetch(`${API_URL}/hotels/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch hotel");
    }

    return data;
};

export const createHotel = async (hotel, token) => {
    const response = await fetch(`${API_URL}/hotels`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(hotel)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create hotel");
    }

    return data;
};

export const updateHotel = async (id, hotel, token) => {
    const response = await fetch(`${API_URL}/hotels/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(hotel)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update hotel");
    }

    return data;
};

export const deleteHotel = async (id, token) => {
    const response = await fetch(`${API_URL}/hotels/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete hotel");
    }

    return data;
};

export const createBooking = async (
    hotelId,
    checkIn,
    checkOut,
    guests,
    token
) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            hotelId,
            checkIn,
            checkOut,
            guests
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create booking");
    }

    return data;
};

export const getMyBookings = async (token) => {
    const response = await fetch(`${API_URL}/bookings/my`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
    }

    return data;
};

export const cancelBooking = async (id, token) => {
    const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking");
    }

    return data;
};

export const createContact = async (
    name,
    email,
    subject,
    message
) => {
    const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            subject,
            message
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
    }

    return data;
};

export const getContacts = async (token) => {
    const response = await fetch(`${API_URL}/contact`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch contact messages");
    }

    return data;
};
