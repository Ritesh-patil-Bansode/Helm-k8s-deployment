const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

const createBooking = async (req, res) => {
    const {
        hotelId,
        checkIn,
        checkOut,
        guests
    } = req.body;

    if (!hotelId || !checkIn || !checkOut || !guests) {
        return res.status(400).json({
            message: "All booking fields are required"
        });
    }

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
        return res.status(400).json({
            message: "Check-out date must be after check-in date"
        });
    }

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const nights = Math.ceil(
        (endDate - startDate) / millisecondsPerDay
    );

    const totalPrice = hotel.price * nights;

    const booking = await Booking.create({
        hotel: hotel._id,
        user: req.user.id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: Number(guests),
        totalPrice
    });

    res.status(201).json({
        message: "Hotel booked successfully",
        booking
    });
};

const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({
        user: req.user.id
    })
        .populate("hotel")
        .sort({ createdAt: -1 });

    res.json(bookings);
};

const cancelBooking = async (req, res) => {
    const booking = await Booking.findOne({
        _id: req.params.id,
        user: req.user.id
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    booking.status = "cancelled";

    await booking.save();

    res.json({
        message: "Booking cancelled successfully",
        booking
    });
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking
};
