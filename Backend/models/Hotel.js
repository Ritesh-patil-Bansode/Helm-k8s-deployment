const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },

        image: {
            type: String,
            required: true
        },

        amenities: {
            type: [String],
            default: []
        },

        contact: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hotel", hotelSchema);
