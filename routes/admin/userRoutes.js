const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/userController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

router.get(
    "/list/user",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listUser
);

router.get(
    "/user/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    controller.userDetail
);

router.delete(
    "/delete/user/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    controller.deleteUser
);

module.exports = router;