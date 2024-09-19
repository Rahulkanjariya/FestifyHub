const couponModel = require("../models/coupon");

async function getDetail(filter) {
    const detail = await couponModel.findOne(filter).exec();
    return detail;
}

async function listCoupon(skip, limit) {
    const list = await couponModel
        .find()
        .skip(skip)
        .limit(limit);
    const total = await couponModel.countDocuments();
    return { list, total };
}

async function addCoupon(detail) {
    const data = new couponModel(detail);
    const newData = await data.save();
    return newData;
}

async function updateCouponUsage(id) {
    const updatedCoupon = await couponModel.findByIdAndUpdate(
        id,
        { $inc: { usedCount: 1 } },
        { new: true, runValidators: true }
    );
    return updatedCoupon;
}

async function deleteCoupon(id) {
    const data = await couponModel.findByIdAndDelete(id).exec();
    return data;
}

module.exports = {
    getDetail,
    listCoupon,
    addCoupon,
    updateCouponUsage,
    deleteCoupon
};
