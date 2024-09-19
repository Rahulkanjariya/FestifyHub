const venueModel = require("../models/venue");

async function getDetail(filter) {
    const detail = await venueModel.findOne(filter).exec();
    return detail;
}

async function listVenue(query, skip, limit) {
    const list = await venueModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await venueModel.find(query).countDocuments().exec();
    return { list,total };
}

async function addVenue(detail) {
    const data = new venueModel(detail);
    const newData = await data.save();
    return newData;
}

async function updateVenue(id, detail) {
    const data = await venueModel.findByIdAndUpdate(
        id,
        detail,
        { new:true }
    );
    return data;
}

async function deleteVenue(id) {
    const data = await venueModel.findByIdAndDelete(id).exec();
    return data;
}

module.exports = {
    getDetail,
    listVenue,
    addVenue,
    updateVenue,
    deleteVenue
}