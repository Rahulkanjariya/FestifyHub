const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth/authController");
const Msg = require("../../utils/messages");
const { body } = require("express-validator");
const { authenticateAnyUser } = require("../../middleware/authToken");

router.post(
    "/signUp",
    body("type")
        .notEmpty()
        .withMessage(Msg.USER_TYPE_REQUIRED),
    body("email")
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("password")
        .notEmpty()
        .withMessage(Msg.PASSWORD_REQUIRED)
        .isLength({ min:6 })
        .withMessage(Msg.INCORRECT_PASSWORD),
    body("firstName")
        .notEmpty()
        .withMessage(Msg.FIRST_NAME_REQUIRED),
    body("lastName")
        .notEmpty()
        .withMessage(Msg.LAST_NAME_REQUIRED),
    body("mobileNumber")
        .notEmpty()
        .withMessage(Msg.MOBILE_NUMBER_REQUIRED)
        .isLength({ min:10, max:12 })
        .withMessage(Msg.INVALID_MOBILE_NUMBER),
    body("age")
        .notEmpty()
        .withMessage(Msg.AGE_REQUIRED),
    body("gender")
        .notEmpty()
        .withMessage(Msg.GENDER_REQUIRED),
    controller.signUp
);

router.post(
    "/login",
    body("email")
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("password")
        .notEmpty()
        .withMessage(Msg.PASSWORD_REQUIRED)
        .isLength({ min:6 })
        .withMessage(Msg.INCORRECT_PASSWORD),
    controller.login
);

router.put(
    "/update/password",authenticateAnyUser,
    body("currentPassword")
        .notEmpty()
        .withMessage(Msg.PASSWORD_REQUIRED)
        .isLength({ min: 6 })
        .withMessage(Msg.INVALID_PASSWORD),
    body("newPassword")
        .notEmpty()
        .withMessage(Msg.PASSWORD_REQUIRED)
        .isLength({ min: 6 })
        .withMessage(Msg.INVALID_PASSWORD),
    controller.updatePassword
);

router.post(
    "/forgot/password",authenticateAnyUser,
    body("email")
        .notEmpty()
        .withMessage(Msg.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    controller.forgotPassword
);

module.exports = router;