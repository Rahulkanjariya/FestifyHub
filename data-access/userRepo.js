const userModel = require("../models/auth");
const bcrypt = require("bcryptjs");

async function getDetail(filter) {
    const detail = await userModel.findOne(filter).exec();
    return detail;
}

async function listUser(query, skip, limit, sort) {
    query.isDeleted = false;
    const list = await userModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await userModel.find(query).countDocuments().exec();
    return { list, total };
}

async function addUser(detail) {
    const data = new userModel(detail);
    const newData = await data.save();
    return newData;
}

async function updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.findByIdAndUpdate(
        id, 
        { password: hashedPassword }, 
        { new: true }
    );
    return user;
}

async function updateProfile(id, detail) {
    const data = await userModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    );
    return data;
}

async function deleteUser(id) {
    const userInfo = {
        firstName: "Unknown person",
        lastName: "Unknown person",
        email: "",
        password: "",
        mobileNumber: "",
        age: 0,
        gender: "",
        isDeleted: true,
    };

    const user = await userModel.findByIdAndUpdate(
        id, 
        userInfo, 
        { new: true }
    ).exec();
    return user;
}

module.exports = {
    getDetail,
    listUser,
    addUser,
    updatePassword,
    updateProfile,
    deleteUser,
};
