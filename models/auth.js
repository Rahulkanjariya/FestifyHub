const mongoose = require("mongoose");
const { type,gender,status } = require("../helpers/enum");

const userSchema = new mongoose.Schema({
    type: {
        type: Number,
        enum: [type.ADMIN,type.ORGANIZER,type.USER],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        enum: [gender.MALE,gender.FEMALE,gender.OTHER],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        enum: [status.ACTIVE, status.INACTIVE],
        default: status.ACTIVE
    },
    createdAt: Number,
    updatedAt: Number,
},
{ 
    timestamps: true 
});

module.exports = mongoose.model("user",userSchema);