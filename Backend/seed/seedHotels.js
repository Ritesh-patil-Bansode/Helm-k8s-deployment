const mongoose = require("mongoose");
const Hotel = require("../models/Hotel");

const locations = [
    "Pune, Maharashtra",
    "Mumbai, Maharashtra",
    "Nashik, Maharashtra",
    "Nagpur, Maharashtra",
    "Aurangabad, Maharashtra",
    "Goa, India",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Chennai, Tamil Nadu",
    "Delhi, India",
    "Jaipur, Rajasthan",
    "Udaipur, Rajasthan",
    "Kolkata, West Bengal",
    "Ahmedabad, Gujarat",
    "Surat, Gujarat"
];

const hotelTypes = [
    "Grand",
    "Royal",
    "Luxury",
    "Comfort",
    "Elite",
    "Premium",
    "Golden",
    "City",
    "Green",
    "Heritage"
];

const amenitiesList = [
    ["WiFi", "Parking", "Restaurant"],
    ["WiFi", "Swimming Pool", "Gym"],
    ["WiFi", "Parking", "Room Service"],
    ["WiFi", "Restaurant", "Spa"],
    ["WiFi", "Parking", "Swimming Pool", "Gym"]
];

const hotels = [];

for (let i = 1; i <= 500; i++) {
    const location = locations[(i - 1) % locations.length];
    const hotelType = hotelTypes[(i - 1) % hotelTypes.length];
    const amenities = amenitiesList[(i - 1) % amenitiesList.length];

    hotels.push({
        name: `${hotelType} Hotel ${i}`,
        location: location,
        description: `A comfortable and modern hotel located in ${location}. Perfect for business and leisure stays.`,
        price: 1500 + ((i * 137) % 5000),
        rating: Number((3 + ((i * 7) % 21) / 10).toFixed(1)),
        image: `https://picsum.photos/seed/hotel-${i}/600/400`,
        amenities: amenities,
        contact: `+91-${9000000000 + i}`
    });
}

const seedHotels = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    await Hotel.deleteMany({});

    await Hotel.insertMany(hotels);

    console.log("500 hotels inserted successfully");

    await mongoose.connection.close();
};

seedHotels();
