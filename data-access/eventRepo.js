const eventModel = require("../models/event");

async function getDetail(filter) {
    const detail = await eventModel.findOne(filter).exec();
    return detail;
}

async function listEvent(query, skip, limit, sort) {
    
    const matchStage = { ...query };
    if (query.status) {
        matchStage.status = query.status;
    }

    const pipeline = [
        { $match: query },
        {
            $lookup: {
                from: "categories", 
                localField: "categoryId",
                foreignField: "_id",
                as: "category" 
            }
        },
        {
            $lookup: {
                from: "venues",
                localField: "venueId",
                foreignField: "_id", 
                as: "venue" 
            }
        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$venue",
                preserveNullAndEmptyArrays: true 
            }
        },

        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
        
        {
            $project: {
                name: 1,
                description: 1,
                date: 1,
                startTime: 1,
                endTime: 1,
                ticketPrice: 1,
                totalTicket: 1,
                availableTicket: 1,
                status: 1,
                "category.name": 1,
                "venue.name": 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ];

    const list = await eventModel.aggregate(pipeline).exec();
    const total = await eventModel.countDocuments(query).exec();
    return { list, total };
}

async function addEvent(detail) {
    const data = new eventModel(detail);
    const newData = await data.save();
    return newData;
}

async function updateEvent(id, detail) {
    const data = await eventModel.findByIdAndUpdate(
        id,
        detail,
        { new: true }
    );
    return data;
}

async function deleteEvent(id) {
    const data = await eventModel.findByIdAndDelete(id).exec();
    return data;
}

module.exports = {
    getDetail,
    listEvent,
    addEvent,
    updateEvent,
    deleteEvent,
};
