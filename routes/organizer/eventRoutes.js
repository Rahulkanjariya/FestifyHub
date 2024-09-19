const express = require("express");
const router = express.Router();
const controller = require("../../controllers/organizer/eventController");
const Msg = require("../../utils/messages");
const { body,param,query } = require("express-validator");
const { authenticateOrganizer } = require("../../middleware/authToken");

router.post(
    "/add/event",authenticateOrganizer,
    body("name")
        .notEmpty()
        .withMessage(Msg.EVENT_NAME_REQUIRED),
    body("description")
        .optional()
        .notEmpty()
        .withMessage(Msg.DESCRIPTION_REQUIRED),
        body("date")
        .notEmpty()
        .withMessage(Msg.DATE_REQUIRED)
        .isDate({ format: "DD-MM-YYYY", strictMode: true })
        .withMessage(Msg.INVALID_DATE_FORMAT),
    body("startTime")
        .notEmpty()
        .withMessage(Msg.START_TIME_REQUIRED)
        .isString()
        .withMessage(Msg.INVALID_START_TIME_FORMAT),
    body("endTime")
        .notEmpty()
        .withMessage(Msg.END_TIME_REQUIRED)
        .isString()
        .withMessage(Msg.INVALID_END_TIME_FORMAT),
    body("ticketPrice")
        .notEmpty()
        .withMessage(Msg.TICKET_PRICE_REQUIRED),
    body("totalTicket")
        .notEmpty()
        .withMessage(Msg.TOTAL_TICKET_REQUIRED),
    body("availableTicket")
        .notEmpty()
        .withMessage(Msg.AVAILABLE_TICKET_REQUIRED),
    body("status")
        .notEmpty()
        .withMessage(Msg.STATUS_REQUIRED),
    body("categoryId")
        .notEmpty()
        .withMessage(Msg.CATEGORY_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    body("venueId")
        .notEmpty()
        .withMessage(Msg.VENUE_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_VENUE_ID),
    controller.addEvent
);

router.get(
    "/list/event",authenticateOrganizer,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listEvent
);

router.get(
    "/event/detail/:id",authenticateOrganizer,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_EVENT_ID),
    controller.eventDetail
);

router.put(
    "/update/event/:id",authenticateOrganizer,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_EVENT_ID),
    body("name")
        .optional()
        .notEmpty()
        .withMessage(Msg.EVENT_NAME_REQUIRED),
    body("description")
        .optional()
        .notEmpty()
        .withMessage(Msg.DESCRIPTION_REQUIRED),
    body("date")
        .optional()
        .notEmpty()
        .withMessage(Msg.DATE_REQUIRED),
    body("startTime")
        .optional()
        .notEmpty()
        .withMessage(Msg.START_TIME_REQUIRED),
    body("endTime")
        .optional()
        .notEmpty()
        .withMessage(Msg.END_TIME_REQUIRED),
    body("ticketPrice")
        .optional()
        .notEmpty()
        .withMessage(Msg.TICKET_PRICE_REQUIRED),
    body("totalTicket")
        .optional()
        .notEmpty()
        .withMessage(Msg.TOTAL_TICKET_REQUIRED),
    body("availableTicket")
        .optional()
        .notEmpty()
        .withMessage(Msg.AVAILABLE_TICKET_REQUIRED),
    body("status")
        .optional()
        .notEmpty()
        .withMessage(Msg.STATUS_REQUIRED),
    controller.updateEvent
);

router.delete(
    "/delete/event/:id",authenticateOrganizer,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_EVENT_ID),
    controller.deleteEvent
);

module.exports = router;