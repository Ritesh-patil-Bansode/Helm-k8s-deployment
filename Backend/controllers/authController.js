const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "user"
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const token = generateToken(user);

    res.json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await User.findOne({
        email,
        role: "admin"
    });

    if (!admin) {
        return res.status(401).json({
            message: "Invalid admin credentials"
        });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid admin credentials"
        });
    }

    const token = generateToken(admin);

    res.json({
        message: "Admin login successful",
        token,
        user: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
        }
    });
};

module.exports = {
    registerUser,
    loginUser,
    loginAdmin
};
