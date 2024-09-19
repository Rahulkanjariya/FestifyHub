const categoryModel = require("../models/category");

async function getDetail(filter) {
    const detail = await categoryModel.findOne(filter).exec();
    return detail;
}

async function listCategory(query, skip, limit, sort) {
    query.isActive = true;
    const list = await categoryModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await categoryModel.find(query).countDocuments().exec();
    return { list, total };
}

async function addCategory(detail) {
    const data = new categoryModel(detail);
    const newData = await data.save();
    return newData;
}

async function updateCategory(id, detail) {
    const data = await categoryModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    );
    return data;
}

async function deleteCategory(id) {
    const categoryInfo = {
        name: "",
        description: "",
        isActive: false
    };

    const category = await categoryModel.findByIdAndUpdate(
        id,
        categoryInfo,
        { new: true }
    ).exec();

    return category;
}


module.exports = {
    getDetail,
    listCategory,
    addCategory,
    updateCategory,
    deleteCategory,
};