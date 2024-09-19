const moment = require("moment");
const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const eventRepo = require("../../data-access/eventRepo");

module.exports = {
    addEvent: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }
            
            const eventExist = await eventRepo.getDetail({ name: req.body.name });
            if (eventExist) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.CONFLICT,
                        Msg.EVENT_EXIST
                    )
                )
            }

            const eventDetail = {
                name: req.body.name,
                description: req.body.description,
                date: moment(req.body.date, "DD-MM-YYYY").valueOf(),
                startTime: moment(req.body.startTime, "HH:mm").valueOf(),
                endTime: moment(req.body.endTime, "HH:mm").valueOf(),
                ticketPrice: req.body.ticketPrice,
                totalTicket: req.body.totalTicket,
                availableTicket: req.body.availableTicket,
                status: req.body.status,
                categoryId: req.body.categoryId,
                venueId: req.body.venueId
            }

            const newEvent = await eventRepo.addEvent(eventDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.EVENT_CREATED,
                    { id:newEvent.id }
                )
            )

        } catch (error) {
            console.error(error)
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    listEvent: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } }
                ];
            }

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await eventRepo.listEvent(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        event: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    eventDetail: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { id } = req.params;
            
            const eventInfo = await eventRepo.getDetail({ _id:id });
            if (!eventInfo) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.EVENT_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { eventInfo }
                )
            )

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    updateEvent: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }
            
            const { id } = req.params;
            
            const existEvent = await eventRepo.getDetail({ _id:id });
            if (!existEvent) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.EVENT_NOT_FOUND
                    )
                )
            }

            const eventDetail = {
                name: req.body.name,
                description: req.body.description,
                date: moment(req.body.date, "DD-MM-YYYY").valueOf(),
                startTime: moment(req.body.startTime, "HH:mm").valueOf(),
                endTime: moment(req.body.endTime, "HH:mm").valueOf(),
                ticketPrice: req.body.ticketPrice,
                totalTicket: req.body.totalTicket,
                availableTicket: req.body.availableTicket,
                status: req.body.status,
                categoryId: req.body.categoryId,
                venueId: req.body.venueId
            }

            const updatedEvent = await eventRepo.updateEvent(id, eventDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.EVENT_UPDATED,
                    { id:updatedEvent.id }
                )
            )

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    },

    deleteEvent: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { id } = req.params;
            
            const deleteEvent = await eventRepo.deleteEvent({ _id:id });
            if (!deleteEvent) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.EVENT_NOT_FOUND
                    )
                )
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.NO_CONTENT,
                    Msg.EVENT_DELETED
                )
            )
            
        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    }
}