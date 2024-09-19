const bookingModel = require("../models/booking");

async function getDetail(filter) {
    const detail = await bookingModel.findOne(filter).exec();
    return detail;
}

async function getUserBooking(filter) {
    const detail = await bookingModel
        .findOne(filter)
        .populate({
            path: "userId",
            select: "firstName  lastName email"
        })
        .populate({
            path: "eventId",
            select: "name date startTime endTime"
        })
        .exec();

    return detail;
}

async function listBooking(query, skip, limit, sort) {
    const pipeline = [
        { $match: query },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetail"
            }
        },
        {
            $lookup: {
                from: "events",
                localField: "eventId",
                foreignField: "_id",
                as: "eventDetail"
            }
        },
        {
            $unwind: {
                path: "$userDetail",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$eventDetail",
                preserveNullAndEmptyArrays: true
            }
        },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
        {
            $project: {
                _id: 1,
                "userDetail.firstName": 1,
                "userDetail.lastName": 1,
                "eventDetail.name": 1,
                "eventDetail.date": 1,
                "eventDetail.startTime": 1,
                "eventDetail.endTime": 1,
                totalAmount: 1,
            }
        }
    ];

    const list = await bookingModel.aggregate(pipeline).exec();
    const total = await bookingModel.countDocuments(query).exec();
    return { list, total };
}


async function addBooking(detail) {
    const data = new bookingModel(detail);
    const newData = await data.save();
    return newData;
}

async function updateBooking(bookingId, updateField) {
    const updatedBooking = await bookingModel.findByIdAndUpdate(
        bookingId,
        { $set: updateField },
        { new: true }
    );
    return updatedBooking;
}


async function updateStatus(id, detail) {
    const updateBooking = await bookingModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    );
    return updateBooking;
}

async function cancelBooking(id) {
    console.log("cancel",id)
    const data = await bookingModel.findByIdAndDelete(id).exec();
    return data;
}

module.exports = {
    getDetail,
    getUserBooking,
    listBooking,
    addBooking,
    updateBooking,
    updateStatus,
    cancelBooking,
};
