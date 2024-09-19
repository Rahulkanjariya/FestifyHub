const mongoose = require("mongoose");
const { bookingStatus,paymentMethod,paymentStatus } = require("../helpers/enum");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type:Number,
        required: true
    },
    status: {
        type: Number,
        enum: [
            bookingStatus.CONFIRMED,
            bookingStatus.CANCELED,
            bookingStatus.PENDING
        ],
        required: true
    },
    paymentMethod: {
        type: Number,
        enum: [
            paymentMethod.CREDIT_CARD,
            paymentMethod.DEBIT_CARD,
            paymentMethod.CASH_ON_DELIVERY
        ],
        required: true
    },
    paymentStatus: {
        type: Number,
        enum: [
            paymentStatus.PENDING,
            paymentStatus.COMPLETED,
            paymentStatus.FAILED
        ],
        required: true
    },
    createdAt: Number,
    updatedAt: Number
},
{
    timestamps: true
});

module.exports = mongoose.model("booking",bookingSchema);