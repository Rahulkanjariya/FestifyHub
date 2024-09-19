const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/bookingController");
const Msg = require("../../utils/messages");
const { body } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

router.post(
    "/add/booking",authenticateUser,
    body("eventId")
        .notEmpty()
        .withMessage(Msg.EVENT_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.EVENT_ID_INVALID),
    body("quantity")
        .notEmpty()
        .withMessage(Msg.QUANTITY_REQUIRED)
        .isInt({ min: 1 })
        .withMessage(Msg.QUANTITY_INVALID),
    body("status")
        .notEmpty()
        .withMessage(Msg.STATUS_REQUIRED),
    body("paymentMethod")
        .notEmpty()
        .withMessage(Msg.PAYMENT_METHOD_REQUIRED),
    body("paymentStatus")
        .notEmpty()
        .withMessage(Msg.PAYMENT_STATUS_REQUIRED),
    controller.addBooking
);

router.post(
    "/apply/coupon",authenticateUser,
    controller.applyCoupon
)

router.get(
    "/booking/detail/:id",authenticateUser,
    controller.bookingDetail
);

router.delete(
    "/booking/cancel/:id",authenticateUser,
    controller.cancelBooking
);

module.exports = router;