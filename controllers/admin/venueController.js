const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const venueRepo = require("../../data-access/venueRepo");

module.exports = {
    addVenue: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const existingVenue = await venueRepo.getDetail({ name: req.body.name });
            if (existingVenue) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.CONFLICT,
                        Msg.VENUE_ALREADY_EXIST
                    )
                )
            }

            const venueDetail = {
                name: req.body.name,
                address: {
                    streetNo: req.body.address.streetNo,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    pinCode: req.body.address.pinCode
                },
                facility: {
                    name: req.body.facility.name,
                    description: req.body.facility.description,
                    capacity: req.body.facility.capacity,
                },
                contactInfo: {
                    email: req.body.contactInfo.email,
                    mobileNumber: req.body.contactInfo.mobileNumber
                }
            };

            const newVenue = await venueRepo.addVenue(venueDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.CREATED,
                    Msg.VENUE_CREATED,
                    { id: newVenue.id }
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

    listVenue: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { 'address.city': { $regex: req.query.search, $options: 'i' } },
                    { 'address.state': { $regex: req.query.search, $options: 'i' } },
                    { 'facility.name': { $regex: req.query.search, $options: 'i' } },
                ];
            }

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await venueRepo.listVenue(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        venue: list,
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
            );
        }
    },

    venueDetail: async function (req, res) {
        try {
            if (services.hashValidatorErrors(req, res)) {
                return;
            }

            const { id } = req.params;

            const venue = await venueRepo.getDetail({ _id:id });
            if (!venue) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.VENUE_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { venue }
                )
            );

        } catch (error) {
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            );
        }
    },

    updateVenue: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }

            const { id } = req.params;
            const existVenue = await venueRepo.getDetail({ _id:id });
            if (!existVenue) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.VENUE_NOT_FOUND
                    )
                )
            }

            const venueDetail = {
                name: req.body.name,
                address: {
                    streetNo: req.body.address.streetNo,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    pinCode: req.body.address.pinCode
                },
                facility: {
                    name: req.body.facility.name,
                    description: req.body.facility.description,
                    capacity: req.body.facility.capacity,
                },
                contactInfo: {
                    email: req.body.contactInfo.email,
                    mobileNumber: req.body.contactInfo.mobileNumber
                }
            };

            const updatedVenue = await venueRepo.updateVenue(id,venueDetail);
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    { id:updatedVenue.id }
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

    deleteVenue: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req,res)) {
                return;
            }
            
            const { id } = req.params;
            
            const deletedVenue = await venueRepo.deleteVenue(id);
            if (!deletedVenue) {
                return res.send(
                    services.prepareResponse(
                        HttpStatus.NOT_FOUND,
                        Msg.VENUE_NOT_FOUND
                    )
                );
            }
            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.VENUE_DELETED
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
    }
}