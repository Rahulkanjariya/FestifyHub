const mongoose = require("mongoose");
const moment = require("moment");
const { eventStatus } = require("../helpers/enum");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true,
        default: () => moment().valueOf()
    },
    startTime: {
        type: Number,
        required: true,
        default: () => moment().valueOf()
    },
    endTime: {
        type: Number,
        required: true,
        default: () => moment().valueOf()
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    totalTicket: {
        type: Number,
        required: true
    },
    availableTicket: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        enum: [
            eventStatus.UPCOMING,
            eventStatus.ONGOING,
            eventStatus.COMPLETED,
            eventStatus.CANCELED
        ],
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "venue",
        required: true
    },
    createdAt: Number,
    updatedAt: Number
},
{
    timestamps: true
});

module.exports = mongoose.model("event", eventSchema);
