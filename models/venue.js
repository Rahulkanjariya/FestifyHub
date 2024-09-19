const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        streetNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
    },
    facility: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        capacity: {
            type: Number
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            required: true,
        }
    },
    createdAt: Number,
    updatedAt: Number
},
{
    timestamps: true 
});

module.exports = mongoose.model("venue",venueSchema);