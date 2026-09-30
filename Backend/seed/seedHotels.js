require("dotenv").config();
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

const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=600&q=80"
];

const hotels = [];

for (let i = 1; i <= 500; i++) {
    const location = locations[(i - 1) % locations.length];
    const hotelType = hotelTypes[(i - 1) % hotelTypes.length];
    const amenities = amenitiesList[(i - 1) % amenitiesList.length];
    const image = hotelImages[(i - 1) % hotelImages.length];

    hotels.push({
        name: `${hotelType} Hotel ${i}`,
        location: location,
        description: `A comfortable and modern hotel located in ${location}. Perfect for business and leisure stays.`,
        price: 1500 + ((i * 137) % 5000),
        rating: Number((3 + ((i * 7) % 21) / 10).toFixed(1)),
        image: image,
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