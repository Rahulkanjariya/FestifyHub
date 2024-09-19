const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/userController");
const Msg = require("../../utils/messages");
const { body } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

router.get(
    "/profile",authenticateUser,
    controller.profile
)

router.put(
    "/update/profile",authenticateUser,
    body("email")
        .optional()
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("password")
        .optional()
        .notEmpty()
        .withMessage(Msg.PASSWORD_REQUIRED)
        .isLength({ min:6 })
        .withMessage(Msg.INCORRECT_PASSWORD),
    body("firstName")
        .optional()
        .notEmpty()
        .withMessage(Msg.FIRST_NAME_REQUIRED),
    body("lastName")
        .optional()
        .notEmpty()
        .withMessage(Msg.LAST_NAME_REQUIRED),
    body("mobileNumber")
        .optional()
        .notEmpty()
        .withMessage(Msg.MOBILE_NUMBER_REQUIRED)
        .isLength({ min:10, max:12 })
        .withMessage(Msg.INVALID_MOBILE_NUMBER),
    body("age")
        .optional()
        .notEmpty()
        .withMessage(Msg.AGE_REQUIRED),
    body("gender")
        .optional()
        .notEmpty()
        .withMessage(Msg.GENDER_REQUIRED),
    controller.updateProfile
)

router.delete(
    "/delete/profile",authenticateUser,
    controller.deleteProfile
)

module.exports = router;