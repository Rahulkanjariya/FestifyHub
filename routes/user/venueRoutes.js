const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/venueController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

router.get(
    "/list/venue",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listVenue
);

router.get(
    "/venue/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_VENUE_ID),
    controller.venueDetail
);

module.exports = router;