const services = require("../../helpers/services");
const Msg = require("../../utils/messages");
const { HttpStatus } = require("../../utils/httpStatus");
const bookingRepo = require("../../data-access/bookingRepo");

module.exports = {
    listBooking: async function (req,res) {
        try {
            if (services.hashValidatorErrors(req.res)) {
                return;
            }

            const { perPage, page, skip } = services.parsePagination(req.query);
            let query = {};
            let sort = {};

            if (req.query.sortBy) {
                sort[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
            }

            const { list, total } = await bookingRepo.listBooking(query, skip, perPage, sort);
            const totalPages = Math.ceil(total / perPage);

            return res.send(
                services.prepareResponse(
                    HttpStatus.OK,
                    Msg.SUCCESS,
                    {
                        booking: list,
                        page: page + 1,
                        perPage: perPage,
                        totalRecords: total,
                        totalPages: totalPages,
                    }
                )
            );

        } catch (error) {
            console.error(error)
            return res.send(
                services.prepareResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Msg.SERVER_ERROR
                )
            )
        }
    }
}