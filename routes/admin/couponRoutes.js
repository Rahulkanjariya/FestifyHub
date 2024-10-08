const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/couponController");
const Msg = require("../../utils/messages");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

router.post(
    "/add/coupon",authenticateAdmin,
    body("code")
        .notEmpty()
        .withMessage(Msg.COUPON_CODE_REQUIRED),
    body("description")
        .notEmpty()
        .withMessage(Msg.COUPON_DESCRIPTION_REQUIRED),
    body("discount")
        .notEmpty()
        .withMessage(Msg.DISCOUNT_AMOUNT_REQUIRED),
    body("expiryDate")
        .notEmpty()
        .withMessage(Msg.EXPIRY_DATE_REQUIRED)
        .isDate({ format: "DD-MM-YYYY", strictMode: true })
        .withMessage(Msg.INVALID_EXPIRY_DATE),
    body("maxUses")
        .notEmpty()
        .withMessage(Msg.INVALID_MAX_USES),
    controller.addCoupon
);

router.get(
    "/list/coupon",authenticateAdmin,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCoupon
);

router.get(
    "/coupon/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_COUPON_ID),
    controller.couponDetail
);

router.delete(
    "/delete/coupon/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_COUPON_ID),
    controller.deleteCoupon
);

module.exports = router;