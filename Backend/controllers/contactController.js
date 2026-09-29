const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    const {
        name,
        email,
        subject,
        message
    } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            message: "All contact fields are required"
        });
    }

    const contact = await Contact.create({
        name,
        email,
        subject,
        message
    });

    res.status(201).json({
        message: "Your message has been sent successfully",
        contact
    });
};

const getContacts = async (req, res) => {
    const contacts = await Contact.find()
        .sort({ createdAt: -1 });

    res.json(contacts);
};

module.exports = {
    createContact,
    getContacts
};
