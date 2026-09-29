const Hotel = require("../models/Hotel");

const getHotels = async (req, res) => {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.json(hotels);
};

const getHotelById = async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }

    res.json(hotel);
};

const createHotel = async (req, res) => {
    const {
        name,
        location,
        description,
        price,
        rating,
        image,
        amenities,
        contact
    } = req.body;

    const hotel = await Hotel.create({
        name,
        location,
        description,
        price,
        rating,
        image,
        amenities,
        contact
    });

    res.status(201).json({
        message: "Hotel created successfully",
        hotel
    });
};

const updateHotel = async (req, res) => {
    const hotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }

    res.json({
        message: "Hotel updated successfully",
        hotel
    });
};

const deleteHotel = async (req, res) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
        return res.status(404).json({
            message: "Hotel not found"
        });
    }

    res.json({
        message: "Hotel deleted successfully"
    });
};

module.exports = {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
};
