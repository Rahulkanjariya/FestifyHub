const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/eventController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

router.get(
    "/list/event",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listEvent
);

router.get(
    "/event/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_EVENT_ID),
    controller.eventDetail
);


module.exports = router;