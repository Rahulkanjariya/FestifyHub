const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/eventController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

router.get(
    "/list/event",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listEvent
);

router.get(
    "/event/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_EVENT_ID),
    controller.eventDetail
);


module.exports = router;