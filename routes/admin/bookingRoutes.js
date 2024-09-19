const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/bookingController");
const Msg = require("../../utils/messages");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");


router.get(
    "/list/booking",authenticateAdmin,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listBooking
)

module.exports = router;