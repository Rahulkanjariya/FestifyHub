const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/venueController");
const Msg = require("../../utils/messages");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

router.post(
    "/add/venue",authenticateAdmin,
    body("name")
        .notEmpty()
        .withMessage(Msg.VENUE_NAME_REQUIRED),
    body("address.streetNo")
        .notEmpty()
        .withMessage(Msg.STREET_NO_REQUIRED),
    body("address.city")
        .notEmpty()
        .withMessage(Msg.CITY_REQUIRED),
    body("address.state")
        .notEmpty()
        .withMessage(Msg.STATE_REQUIRED),
    body("address.pinCode")
        .notEmpty()
        .withMessage(Msg.PIN_CODE_REQUIRED),
    body("facility.name")
        .notEmpty()
        .withMessage(Msg.FACILITY_NAME_REQUIRED),
    body("facility.description")
        .notEmpty()
        .withMessage(Msg.FACILITY_DESCRIPTION_REQUIRED),
    body("facility.capacity")
        .optional()
        .isNumeric()
        .withMessage(Msg.FACILITY_CAPACITY_INVALID),
    body("contactInfo.email")
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("contactInfo.mobileNumber")
        .notEmpty()
        .withMessage(Msg.MOBILE_NUMBER_REQUIRED)
        .isLength({ min: 10, max: 12 })
        .withMessage(Msg.INVALID_MOBILE_NUMBER),
    controller.addVenue
);

router.get(
    "/list/venue",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listVenue
);

router.get(
    "/venue/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_VENUE_ID),
    controller.venueDetail
);

router.put(
    "/update/venue/:id",authenticateAdmin,
    body("name")
        .optional()
        .notEmpty()
        .withMessage(Msg.VENUE_NAME_REQUIRED),
    body("address.streetNo")
        .optional()
        .notEmpty()
        .withMessage(Msg.STREET_NO_REQUIRED),
    body("address.city")
        .optional()
        .notEmpty()
        .withMessage(Msg.CITY_REQUIRED),
    body("address.state")
        .optional()
        .notEmpty()
        .withMessage(Msg.STATE_REQUIRED),
    body("address.pinCode")
        .optional()
        .notEmpty()
        .withMessage(Msg.PIN_CODE_REQUIRED),
    body("facility.name")
        .optional()
        .notEmpty()
        .withMessage(Msg.FACILITY_NAME_REQUIRED),
    body("facility.description")
        .optional()
        .notEmpty()
        .withMessage(Msg.FACILITY_DESCRIPTION_REQUIRED),
    body("facility.capacity")
        .optional()
        .isNumeric()
        .withMessage(Msg.FACILITY_CAPACITY_INVALID),
    body("contactInfo.email")
        .optional()
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("contactInfo.mobileNumber")
        .optional()
        .notEmpty()
        .withMessage(Msg.MOBILE_NUMBER_REQUIRED)
        .isLength({ min: 10, max: 12 })
        .withMessage(Msg.INVALID_MOBILE_NUMBER),
    controller.updateVenue
)

router.delete(
    "/delete/venue/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_VENUE_ID),
    controller.deleteVenue
);

module.exports = router;