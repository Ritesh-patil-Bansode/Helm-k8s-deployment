const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
        email: "admin@hotel.com"
    });

    if (existingAdmin) {
        console.log("Admin already exists");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
        name: "Hotel Admin",
        email: "admin@hotel.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("Admin created successfully");

    process.exit(0);
};

createAdmin();
