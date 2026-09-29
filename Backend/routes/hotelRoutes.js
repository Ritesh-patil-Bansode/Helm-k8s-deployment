const express = require("express");

const {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, getHotels);

router.get("/:id", protect, getHotelById);

router.post("/", protect, adminOnly, createHotel);

router.put("/:id", protect, adminOnly, updateHotel);

router.delete("/:id", protect, adminOnly, deleteHotel);

module.exports = router;
